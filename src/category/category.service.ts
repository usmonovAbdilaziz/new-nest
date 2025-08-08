import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { handleError, successMessage } from 'src/helpers/response';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryModel.create({
        ...createCategoryDto,
      });
      return successMessage(newCategory, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const categoies = await this.categoryModel.findAll({
        order: [['id', 'ASC']],
      });
      return successMessage(categoies);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryModel.findByPk(id);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return successMessage(category);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel.update(updateCategoryDto, {
        where: { id },
        returning: true,
      });
      if (category[0] === 0) {
        throw new NotFoundException('Category not found');
      }
      return successMessage(category[1][0]);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryModel.destroy({ where: { id } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      return successMessage(['Deleted category from ID']);
    } catch (error) {
      handleError(error);
    }
  }
}
