import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Category, PopularCategory } from '@torba/shared';
import { CategoryDto, PopularCategoryDto } from './categories.dto.js';
import { CategoriesService } from './categories.service.js';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Category tree with subcategories (mega menu, header row)' })
  @ApiOkResponse({ type: CategoryDto, isArray: true })
  getTree(): Promise<Category[]> {
    return this.categories.getTree();
  }

  @Get('popular')
  @ApiOperation({ summary: 'Popular categories block' })
  @ApiOkResponse({ type: PopularCategoryDto, isArray: true })
  getPopular(): Promise<PopularCategory[]> {
    return this.categories.getPopular();
  }
}
