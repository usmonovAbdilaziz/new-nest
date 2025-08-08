import {
  NotFoundException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin, Role } from './entities/admin.entity';
import { handleError, successMessage } from 'src/helpers/response';
import { hash, compare } from 'bcrypt';
@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}

  async createOwner() {
    try {
      const existsAdmin = await this.adminModel.findOne({
        where: { role: Role.Superadmin, phone_number: process.env.OWNER_PHONE },
      });
      if (existsAdmin) {
        this.logger.log('Superadmin aleready exists');
        return;
      }
      const hashPass = await hash(String(process.env.OWNER_PASS), 7);
      const owner = await this.create({
        full_name: String(process.env.OWNER_NAME),
        phone_number: String(process.env.OWNER_PHONE),
        password: String(hashPass),
        role: Role.Superadmin,
      });
      this.logger.log(`${owner} \n This owner create succesfully`);
    } catch (error) {
      console.log('Superadmin yaratishda xatolik');
      handleError(error);
    }
  }
  async create(createAdminDto: CreateAdminDto) {
    try {
      const { phone_number } = createAdminDto;
      const admin = await this.adminModel.findOne({ where: { phone_number } });
      if (admin) {
        throw new NotFoundException('Admin already exists');
      }
      const newAdmin = await this.adminModel.create({ ...createAdminDto });
      return successMessage(newAdmin, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const admins = await this.adminModel.findAll({ order: [['id', 'ASC']] });
      return successMessage(admins);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.adminModel.findByPk(id);
      if (!admin) {
        throw new NotFoundException('Admin not found');
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
        throw new NotFoundException('Admin not found');
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
        throw new NotFoundException('Admin not found');
      }
      return successMessage({ message: 'Deleted with ID' });
    } catch (error) {
      handleError(error);
    }
  }
}
@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly adminService: AdminService) {}

  async onModuleInit() {
    await this.adminService.createOwner();
  }
}
