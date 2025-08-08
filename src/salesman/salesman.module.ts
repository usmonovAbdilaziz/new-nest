import { Module } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { SalesmanController } from './salesman.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Salesman } from './entities/salesman.entity';

@Module({
  imports: [SequelizeModule.forFeature([Salesman])],
  controllers: [SalesmanController],
  providers: [SalesmanService],
})
export class SalesmanModule {}
