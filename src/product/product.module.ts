import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Salesman } from 'src/salesman/entities/salesman.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product, Salesman, Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
