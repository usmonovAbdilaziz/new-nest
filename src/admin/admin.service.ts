import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { handleError, successMessage } from 'src/helpers/response';
import { asyncWrapProviders } from 'async_hooks';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto) {
    try {
      const { phone_number } = createAdminDto;
      const admin = await this.adminModel.findOne({ where: { phone_number } });
      if (admin) {
        throw new ConflictException('Admin already exists');
      }
      const newAdmin = await this.adminModel.create({ ...createAdminDto });
      return successMessage(newAdmin, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const admins = await this.adminModel.findAll();
      return successMessage(admins);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.adminModel.findByPk(id);
      if (!admin) {
        throw new ConflictException('Admin not found');
      }
      return successMessage(admin);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const newAdmin = await this.adminModel.update(updateAdminDto, {
        where: { id },
        returning: true,
      });
      if (newAdmin[0] === 0) {
        throw new ConflictException('Admin not found');
      }
      return successMessage(newAdmin[1][0]);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const admin = await this.adminModel.destroy({ where: { id } });
      if (admin === 0) {
        throw new ConflictException('Admin not found');
      }
      return successMessage({ message: 'Deleted with ID' });
    } catch (error) {
      handleError(error);
    }
  }
}
