import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { CilentModule } from './cilent/cilent.module';
import { Cilent } from './cilent/entities/cilent.entity';
import { SalesmanModule } from './salesman/salesman.module';
import { Salesman } from './salesman/entities/salesman.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { ProductModule } from './product/product.module';
import { SolidProductModule } from './solid-product/solid-product.module';
import { Product } from './product/entities/product.entity';
import { SolidProduct } from './solid-product/entities/solid-product.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: String('abudev99'),
      database: String(process.env.DB_NAME),
      synchronize: true,
      autoLoadModels: true,
      logging: false,
      models: [Admin, Cilent, Salesman, Category, Product, SolidProduct],
    }),
    AdminModule,
    CilentModule,
    SalesmanModule,
    CategoryModule,
    ProductModule,
    SolidProductModule,
  ],
})
export class AppModule {}
