import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Banner } from '@torba/shared';
import { BannerDto } from './banners.dto.js';
import { BannersService } from './banners.service.js';

@ApiTags('banners')
@Controller('banners')
export class BannersController {
  constructor(private readonly banners: BannersService) {}

  @Get()
  @ApiOperation({ summary: 'Home slider banners and featured campaigns, ordered' })
  @ApiOkResponse({ type: BannerDto, isArray: true })
  findAll(): Promise<Banner[]> {
    return this.banners.findAll();
  }
}
