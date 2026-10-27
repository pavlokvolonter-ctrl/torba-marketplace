import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, type DeliveryType } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString:
      process.env.DATABASE_URL ?? 'postgresql://torba:torba@localhost:5432/torba?schema=public',
  }),
});

type CategorySeed = {
  slug: string;
  name: string;
  icon: string;
  popular?: boolean;
  children: [slug: string, name: string][];
};

const categories: CategorySeed[] = [
  {
    slug: 'furniture',
    name: 'Меблі',
    icon: 'sofa',
    popular: true,
    children: [
      ['sofas', 'Дивани'],
      ['tables', 'Столи'],
      ['chairs', 'Стільці та крісла'],
      ['wardrobes', 'Шафи'],
    ],
  },
  {
    slug: 'clothes',
    name: 'Одяг',
    icon: 'shirt',
    popular: true,
    children: [
      ['women', 'Жіночий одяг'],
      ['men', 'Чоловічий одяг'],
      ['shoes', 'Взуття'],
    ],
  },
  {
    slug: 'electronics',
    name: 'Електроніка',
    icon: 'smartphone',
    popular: true,
    children: [
      ['phones', 'Смартфони'],
      ['laptops', 'Ноутбуки'],
      ['headphones', 'Навушники'],
    ],
  },
  {
    slug: 'lighting',
    name: 'Освітлення',
    icon: 'lamp',
    popular: true,
    children: [
      ['lamps', 'Лампи'],
      ['chandeliers', 'Люстри'],
    ],
  },
  {
    slug: 'chargers',
    name: 'Зарядні пристрої',
    icon: 'battery-charging',
    popular: true,
    children: [
      ['power-banks', 'Повербанки'],
      ['power-stations', 'Зарядні станції'],
    ],
  },
  {
    slug: 'garden',
    name: 'Сад і город',
    icon: 'flower',
    popular: true,
    children: [
      ['garden-tools', 'Інструменти'],
      ['plants', 'Рослини'],
    ],
  },
];

const regions: { name: string; cities: string[] }[] = [
  { name: 'Київська область', cities: ['Київ', 'Біла Церква', 'Бровари'] },
  { name: 'Львівська область', cities: ['Львів', 'Дрогобич'] },
  { name: 'Одеська область', cities: ['Одеса', 'Чорноморськ'] },
  { name: 'Харківська область', cities: ['Харків'] },
  { name: 'Дніпропетровська область', cities: ['Дніпро', 'Кривий Ріг'] },
];

const banners = [
  {
    title: 'Знайди своє на Torba',
    text: 'Тисячі оголошень від людей поруч',
    ctaLabel: 'До каталогу',
    href: '/catalog',
    isFeatured: false,
  },
  {
    title: 'Нові надходження',
    text: 'Свіжі пропозиції щодня',
    ctaLabel: 'Дивитись',
    href: '/catalog?sort=new',
    isFeatured: false,
  },
  {
    title: 'Holiday Sale',
    text: 'Святкові знижки до -50%',
    ctaLabel: 'Обрати подарунок',
    href: '/catalog?campaign=holiday',
    isFeatured: true,
  },
  {
    title: 'Black Friday',
    text: 'Найкращі ціни року',
    ctaLabel: 'Переглянути',
    href: '/catalog?campaign=black-friday',
    isFeatured: true,
  },
];

// [title, categorySlug, price, oldPrice, badge, delivery, city]
type ProductSeed = [string, string, number, number | null, string | null, DeliveryType, string];

const products: ProductSeed[] = [
  ['Кутовий диван Lofty', 'sofas', 14500, 17900, null, 'COURIER', 'Київ'],
  ['Обідній стіл дубовий', 'tables', 6200, null, 'Новинка', 'NOVA_POSHTA', 'Львів'],
  ['Крісло-гойдалка', 'chairs', 3100, 3800, null, 'NOVA_POSHTA', 'Одеса'],
  ['Шафа-купе 2 м', 'wardrobes', 9800, null, null, 'PICKUP', 'Харків'],
  ['Зимова куртка жіноча', 'women', 2300, 2900, 'Новинка', 'NOVA_POSHTA', 'Київ'],
  ['Чоловічий светр', 'men', 950, null, null, 'UKRPOSHTA', 'Дніпро'],
  ['Кросівки Run Pro', 'shoes', 1800, 2200, null, 'NOVA_POSHTA', 'Львів'],
  ['Смартфон X12 128 ГБ', 'phones', 11900, 13500, 'Новинка', 'NOVA_POSHTA', 'Київ'],
  ['Ноутбук Air 14"', 'laptops', 28900, null, null, 'NOVA_POSHTA', 'Харків'],
  ['Бездротові навушники', 'headphones', 1450, 1900, null, 'UKRPOSHTA', 'Одеса'],
  ['Настільна лампа LED', 'lamps', 640, null, 'Новинка', 'NOVA_POSHTA', 'Бровари'],
  ['Люстра кришталева', 'chandeliers', 4700, 5600, null, 'COURIER', 'Київ'],
  ['Повербанк 20000 мАг', 'power-banks', 890, 1100, null, 'NOVA_POSHTA', 'Дніпро'],
  ['Зарядна станція 500 Вт', 'power-stations', 18500, 21000, 'Новинка', 'NOVA_POSHTA', 'Львів'],
  ['Набір садових інструментів', 'garden-tools', 780, null, null, 'UKRPOSHTA', 'Біла Церква'],
  ['Туя смарагд, саджанець', 'plants', 350, null, null, 'PICKUP', 'Дрогобич'],
  ['Комп’ютерний стіл', 'tables', 3400, 4100, null, 'NOVA_POSHTA', 'Одеса'],
  ['Диван-книжка', 'sofas', 7900, null, null, 'COURIER', 'Харків'],
  ['Пуховик чоловічий', 'men', 3300, 4000, null, 'NOVA_POSHTA', 'Кривий Ріг'],
  ['Планшет Tab 10', 'phones', 6700, null, 'Новинка', 'NOVA_POSHTA', 'Київ'],
  ['Підлогова лампа', 'lamps', 1250, 1500, null, 'NOVA_POSHTA', 'Львів'],
  ['Сонячна зарядка', 'power-banks', 1600, null, null, 'UKRPOSHTA', 'Чорноморськ'],
  ['Газонокосарка електрична', 'garden-tools', 5400, 6200, null, 'COURIER', 'Дніпро'],
  ['Офісне крісло Ergo', 'chairs', 4200, 5000, null, 'NOVA_POSHTA', 'Київ'],
];

const slugify = (s: string) => {
  const map: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'h',
    ґ: 'g',
    д: 'd',
    е: 'e',
    є: 'ie',
    ж: 'zh',
    з: 'z',
    и: 'y',
    і: 'i',
    ї: 'i',
    й: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ь: '',
    ю: 'iu',
    я: 'ia',
  };
  return s
    .toLowerCase()
    .replace(/[а-яґєіїь]/g, (c) => map[c] ?? '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

async function main() {
  await prisma.product.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.location.deleteMany();
  await prisma.category.deleteMany({ where: { parentId: { not: null } } });
  await prisma.category.deleteMany();

  const categoryIds = new Map<string, string>();
  for (const [i, c] of categories.entries()) {
    const parent = await prisma.category.create({
      data: { slug: c.slug, name: c.name, icon: c.icon, isPopular: c.popular ?? false, order: i },
    });
    categoryIds.set(c.slug, parent.id);
    for (const [j, [slug, name]] of c.children.entries()) {
      const child = await prisma.category.create({
        data: { slug, name, order: j, parentId: parent.id },
      });
      categoryIds.set(slug, child.id);
    }
  }

  const locationIds = new Map<string, string>();
  for (const r of regions) {
    await prisma.location.create({ data: { name: r.name } });
    for (const city of r.cities) {
      const loc = await prisma.location.create({ data: { name: city, region: r.name } });
      locationIds.set(city, loc.id);
    }
  }

  for (const [i, b] of banners.entries()) {
    await prisma.banner.create({
      data: {
        ...b,
        order: i + 1,
        imageUrl: `https://picsum.photos/seed/torba-banner-${i + 1}/1200/400`,
      },
    });
  }

  for (const [i, [title, cat, price, oldPrice, badge, deliveryType, city]] of products.entries()) {
    await prisma.product.create({
      data: {
        slug: slugify(title),
        title,
        image: `https://picsum.photos/seed/torba-product-${i + 1}/600/600`,
        price,
        oldPrice,
        badge,
        deliveryType,
        trendScore: products.length - i,
        categoryId: categoryIds.get(cat)!,
        locationId: locationIds.get(city)!,
      },
    });
  }

  console.log(
    `Seeded ${categoryIds.size} categories, ${banners.length} banners, ${products.length} products, ${locationIds.size} cities`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
