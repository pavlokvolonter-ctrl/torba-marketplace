import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Location } from '@torba/shared';
import { LocationDto } from './locations.dto.js';
import { LocationsService } from './locations.service.js';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locations: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Regions and cities for the header location picker' })
  @ApiOkResponse({ type: LocationDto, isArray: true })
  findAll(): Promise<Location[]> {
    return this.locations.findAll();
  }
}
