import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolidProductDto } from './dto/create-solid-product.dto';
import { UpdateSolidProductDto } from './dto/update-solid-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SolidProduct } from './entities/solid-product.entity';
import { Product } from 'src/product/entities/product.entity';
import { Cilent } from 'src/cilent/entities/cilent.entity';
import { handleError, successMessage } from 'src/helpers/response';

@Injectable()
export class SolidProductService {
  constructor(
    @InjectModel(SolidProduct)
    private readonly solidProductModel: typeof SolidProduct,
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(Cilent) private readonly cilentModel: typeof Cilent,
  ) {}
  async create(createSolidProductDto: CreateSolidProductDto) {
    try {
      const { product_id, cilent_id } = createSolidProductDto;
      if (product_id) {
        const product = await this.productModel.findByPk(product_id);
        if (!product) {
          throw new NotFoundException('Product not found');
        }
      }
      if (cilent_id) {
        const cilent = await this.cilentModel.findByPk(cilent_id);
        if (!cilent) {
          throw new NotFoundException('Cilent not found');
        }
      }
      const newSProduct = await this.solidProductModel.create({
        ...createSolidProductDto,
      });
      return successMessage(newSProduct, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll() {
    try {
      const sProducts = await this.solidProductModel.findAll({
        include: { all: true },
        order: [['id', 'ASC']],
      });
      return successMessage(sProducts);
    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.solidProductModel.findByPk(id, {
        include: { all: true },
      });
      if (!product) {
        throw new NotFoundException('Solid-product not found');
      }
      return successMessage(product);
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateSolidProductDto: UpdateSolidProductDto) {
    try {
      const { product_id, cilent_id } = updateSolidProductDto;
      if (product_id) {
        const product = await this.productModel.findByPk(product_id);
        if (!product) {
          throw new NotFoundException('Product not found');
        }
      }
      if (cilent_id) {
        const cilent = await this.productModel.findByPk(cilent_id);
        if (!cilent) {
          throw new NotFoundException('Cilent not found');
        }
      }
      const newSProduct = await this.solidProductModel.update(
        updateSolidProductDto,
        { where: { id }, returning: true },
      );
      if (newSProduct[0] === 0) {
        throw new NotFoundException('Solid-Product not found');
      }
      return successMessage(newSProduct[1][0]);
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const sProducts = await this.solidProductModel.destroy({ where: { id } });
      if (!sProducts) {
        throw new NotFoundException('Solid products not found');
      }
      return successMessage(['Deleted Solid Product from ID']);
    } catch (error) {
      handleError(error);
    }
  }
}
