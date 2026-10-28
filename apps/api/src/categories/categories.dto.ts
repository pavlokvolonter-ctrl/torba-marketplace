import { ApiProperty } from '@nestjs/swagger';

export class PopularCategoryDto {
  @ApiProperty({ example: 'ckx1' }) id!: string;
  @ApiProperty({ example: 'furniture' }) slug!: string;
  @ApiProperty({ example: 'Меблі' }) name!: string;
  @ApiProperty({ example: 'sofa', nullable: true, type: String }) icon!: string | null;
}

export class CategoryDto extends PopularCategoryDto {
  @ApiProperty({ type: () => [CategoryDto] }) children!: CategoryDto[];
}
