import { Module } from '@nestjs/common';
import { SolidProductService } from './solid-product.service';
import { SolidProductController } from './solid-product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SolidProduct } from './entities/solid-product.entity';
import { Product } from 'src/product/entities/product.entity';
import { Cilent } from 'src/cilent/entities/cilent.entity';

@Module({
  imports: [SequelizeModule.forFeature([SolidProduct, Product, Cilent])],
  controllers: [SolidProductController],
  providers: [SolidProductService],
})
export class SolidProductModule {}
