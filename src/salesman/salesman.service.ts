import {
  NotFoundException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { CreateSalesmanDto } from './dto/create-salesman.dto';
import { UpdateSalesmanDto } from './dto/update-salesman.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Salesman } from './entities/salesman.entity';
import { handleError, successMessage } from 'src/helpers/response';
import { hash, compare } from 'bcrypt';

@Injectable()
export class SalesmanService {
  constructor(
    @InjectModel(Salesman) private readonly salesmanModel: typeof Salesman,
  ) {}
  async create(createSalesmanDto: CreateSalesmanDto) {
    try {
      const { username, phone_number, password, email } = createSalesmanDto;
      const salesman1 = await this.salesmanModel.findOne({
        where: { username },
      });
      if (salesman1) {
        throw new ConflictException('This user already exists');
      }
      const salesman2 = await this.salesmanModel.findOne({
        where: { phone_number },
      });
      if (salesman2) {
        throw new ConflictException('This phone number already exists');
      }
      const salesman3 = await this.salesmanModel.findOne({
        where: { email },
      });
      if (salesman3) {
        throw new ConflictException('This email already exists');
      }
      const hashPass = await hash(String(password), 7);
      const newSalesman = await this.salesmanModel.create({
        ...createSalesmanDto,
        password: hashPass,
      });
      return successMessage(newSalesman, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const salesmans = await this.salesmanModel.findAll({
        order: [['id', 'ASC']],
      });
      return successMessage(salesmans);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const salesman = await this.salesmanModel.findByPk(id);
      if (!salesman) {
        throw new NotFoundException('Salesman not found');
      }
      return successMessage(salesman);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateSalesmanDto: UpdateSalesmanDto) {
    try {
      const newSalesman = await this.salesmanModel.update(updateSalesmanDto, {
        where: { id },
        returning: true,
      });
      if (newSalesman[0] === 0) {
        throw new NotFoundException('Salesman not found');
      }
      return successMessage(newSalesman[1][0]);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const salesman = await this.salesmanModel.destroy({ where: { id } });
      if (!salesman) {
        throw new NotFoundException('Salesman not found');
      }
      return successMessage(['Deleted Salesman from ID']);
    } catch (error) {
      handleError(error);
    }
  }
}
