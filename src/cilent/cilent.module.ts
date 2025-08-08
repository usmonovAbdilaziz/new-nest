import { Module } from '@nestjs/common';
import { CilentService } from './cilent.service';
import { CilentController } from './cilent.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cilent } from './entities/cilent.entity';

@Module({
  imports: [SequelizeModule.forFeature([Cilent])],
  controllers: [CilentController],
  providers: [CilentService],
})
export class CilentModule {}
