import { Module } from '@nestjs/common';
import { AdminService, AppService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AppService],
})
export class AdminModule {}
