import { ApiProperty } from '@nestjs/swagger';

export class BannerDto {
  @ApiProperty() id!: string;
  @ApiProperty({ example: 'Holiday Sale' }) title!: string;
  @ApiProperty({ nullable: true, type: String }) text!: string | null;
  @ApiProperty({ example: 'https://picsum.photos/seed/banner1/1200/400' }) imageUrl!: string;
  @ApiProperty({ nullable: true, type: String, example: 'Дивитись' }) ctaLabel!: string | null;
  @ApiProperty({ nullable: true, type: String, example: '/catalog' }) href!: string | null;
  @ApiProperty({ example: 1, description: 'Slider order, ascending' }) order!: number;
  @ApiProperty({ description: 'Featured campaign (Holiday, Black Friday)' }) isFeatured!: boolean;
}
