import { buildCategoryTree, CategoriesService } from './categories.service.js';

const row = (id: string, parentId: string | null = null) => ({
  id,
  slug: id,
  name: id.toUpperCase(),
  icon: null,
  parentId,
});

describe('buildCategoryTree', () => {
  it('nests children under their parents and keeps order', () => {
    const tree = buildCategoryTree([row('a'), row('b'), row('a1', 'a'), row('a2', 'a')]);

    expect(tree.map((c) => c.id)).toEqual(['a', 'b']);
    expect(tree[0]!.children.map((c) => c.id)).toEqual(['a1', 'a2']);
    expect(tree[1]!.children).toEqual([]);
  });

  it('treats rows with an unknown parent as roots', () => {
    expect(buildCategoryTree([row('x', 'missing')]).map((c) => c.id)).toEqual(['x']);
  });
});

describe('CategoriesService', () => {
  const findMany = vi.fn();
  const service = new CategoriesService({ category: { findMany } } as never);

  beforeEach(() => findMany.mockReset());

  it('getTree returns the nested tree', async () => {
    findMany.mockResolvedValue([row('a'), row('a1', 'a')]);

    const tree = await service.getTree();

    expect(tree).toHaveLength(1);
    expect(tree[0]!.children[0]!.id).toBe('a1');
  });

  it('getPopular queries popular categories and returns slim items', async () => {
    findMany.mockResolvedValue([{ ...row('a'), icon: 'sofa', isPopular: true, order: 0 }]);

    const popular = await service.getPopular();

    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { isPopular: true } }));
    expect(popular).toEqual([{ id: 'a', slug: 'a', name: 'A', icon: 'sofa' }]);
  });
});
