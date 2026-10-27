import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class TrendingQueryDto {
  @ApiPropertyOptional({ default: 1, minimum: 1, description: 'Page number, starts at 1' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ default: 8, minimum: 1, maximum: 50, description: 'Items per page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 8;
}

export class MoneyDto {
  @ApiProperty({ example: 1299 }) amount!: number;
  @ApiProperty({ enum: ['UAH'], example: 'UAH' }) currency!: 'UAH';
}

export class ProductCategoryDto {
  @ApiProperty() id!: string;
  @ApiProperty({ example: 'furniture' }) slug!: string;
  @ApiProperty({ example: 'Меблі' }) name!: string;
}

export class ProductSummaryDto {
  @ApiProperty() id!: string;
  @ApiProperty({ example: 'kutovyi-dyvan-lofty' }) slug!: string;
  @ApiProperty({ example: 'Кутовий диван Lofty' }) title!: string;
  @ApiProperty({ example: 'https://picsum.photos/seed/sofa/600/600' }) image!: string;
  @ApiProperty({ type: MoneyDto }) price!: MoneyDto;
  @ApiProperty({ type: MoneyDto, nullable: true }) oldPrice!: MoneyDto | null;
  @ApiProperty({ type: ProductCategoryDto }) category!: ProductCategoryDto;
  @ApiProperty({ nullable: true, type: String, example: 'Новинка' }) badge!: string | null;
  @ApiProperty({ enum: ['NOVA_POSHTA', 'UKRPOSHTA', 'PICKUP', 'COURIER'] })
  deliveryType!: 'NOVA_POSHTA' | 'UKRPOSHTA' | 'PICKUP' | 'COURIER';
  @ApiProperty({ example: 'Київ' }) city!: string;
  @ApiProperty({ example: false }) isFavorite!: boolean;
}

export class PaginatedProductsDto {
  @ApiProperty({ type: [ProductSummaryDto] }) items!: ProductSummaryDto[];
  @ApiProperty({ example: 1 }) page!: number;
  @ApiProperty({ example: 8 }) limit!: number;
  @ApiProperty({ example: 24 }) total!: number;
  @ApiProperty({ description: 'True if the "Show more" button should stay visible' })
  hasMore!: boolean;
}
