import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { handleError, successMessage } from 'src/helpers/response';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Salesman } from 'src/salesman/entities/salesman.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(Salesman) private readonly salesmanModel: typeof Salesman,
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const salesman = await this.salesmanModel.findByPk(
        createProductDto.salesman_id,
      );
      if (!salesman) {
        throw new NotFoundException('Salesman not found');
      }
      const category = await this.categoryModel.findByPk(
        createProductDto.category_id,
      );
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      const newProduct = await this.productModel.create({
        ...createProductDto,
      });
      return successMessage(newProduct, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.findAll({
        include: { all: true },
        order: [['id', 'ASC']],
      });
      return successMessage(products);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productModel.findByPk(id, {
        include: { all: true },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return successMessage(product);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const { salesman_id, category_id } = updateProductDto;
      if (salesman_id) {
        const salesman = await this.salesmanModel.findByPk(salesman_id);
        if (!salesman) {
          throw new NotFoundException('Salesman not found');
        }
      }
      if (category_id) {
        const category = await this.categoryModel.findByPk(category_id);
        if (!category) {
          throw new NotFoundException('Category not found');
        }
      }
      const product = await this.productModel.update(updateProductDto, {
        where: { id },
        returning: true,
      });
      if (product[0] === 0) {
        throw new NotFoundException('Product not found');
      }
      return successMessage(product[1][0]);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productModel.destroy({ where: { id } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return successMessage(['Deleted product from ID']);
    } catch (error) {
      handleError(error);
    }
  }
}
