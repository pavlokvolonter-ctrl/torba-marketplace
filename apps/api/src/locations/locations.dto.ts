import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty() id!: string;
  @ApiProperty({ example: 'Київ' }) name!: string;
  @ApiProperty({ nullable: true, type: String, example: 'Київська область' }) region!:
    string | null;
}
