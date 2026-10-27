import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BannersModule } from './banners/banners.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [PrismaModule, CategoriesModule, BannersModule, ProductsModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
