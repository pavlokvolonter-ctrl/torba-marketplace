import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Paginated, ProductSummary } from '@torba/shared';
import { PaginatedProductsDto, TrendingQueryDto } from './products.dto.js';
import { ProductsService } from './products.service.js';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get('trending')
  @ApiOperation({ summary: 'Trending products ("Зараз у тренді") with "Show more" pagination' })
  @ApiOkResponse({ type: PaginatedProductsDto })
  getTrending(@Query() query: TrendingQueryDto): Promise<Paginated<ProductSummary>> {
    return this.products.getTrending(query.page, query.limit);
  }
}
