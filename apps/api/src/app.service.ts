import { Injectable } from '@nestjs/common';
import type { HealthResponse } from '@torba/shared';

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'torba-api',
    };
  }
}
