import {
  NotFoundException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { CreateCilentDto } from './dto/create-cilent.dto';
import { UpdateCilentDto } from './dto/update-cilent.dto';
import { handleError, successMessage } from 'src/helpers/response';
import { InjectModel } from '@nestjs/sequelize';
import { Cilent } from './entities/cilent.entity';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CilentService {
  constructor(
    @InjectModel(Cilent) private readonly clientModel: typeof Cilent,
  ) {}
  async create(createCilentDto: CreateCilentDto) {
    try {
      const { phone_number, password } = createCilentDto;
      const client = await this.clientModel.findOne({
        where: { phone_number },
      });
      if (client) {
        throw new ConflictException('Client already exists');
      }
      const hashPass = await hash(String(password), 7);

      const newClient = await this.clientModel.create({
        ...createCilentDto,
        password: hashPass,
      });
      return successMessage(newClient, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const allClilent = await this.clientModel.findAll({
        order: [['id', 'ASC']],
      });
      return successMessage(allClilent);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const cilent = await this.clientModel.findOne({ where: { id } });
      if (!cilent) {
        throw new NotFoundException('Cilent not found');
      }
      return successMessage(cilent);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateCilentDto: UpdateCilentDto) {
    try {
      const newCilent = await this.clientModel.update(updateCilentDto, {
        where: { id },
        returning: true,
      });
      if (newCilent[0] === 0) {
        throw new NotFoundException('Client not found');
      }
      return successMessage(newCilent[1][0]);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const client = await this.clientModel.destroy({ where: { id } });
      if (!client) {
        throw new NotFoundException('Cilent not found');
      }
      return successMessage(['Deleted Clinet from ID']);
    } catch (error) {
      handleError(error);
    }
  }
}
