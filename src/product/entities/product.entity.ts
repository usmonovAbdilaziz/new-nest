import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/category/entities/category.entity';
import { Salesman } from 'src/salesman/entities/salesman.entity';
import { SolidProduct } from 'src/solid-product/entities/solid-product.entity';

@Table({ tableName: 'product' })
export class Product extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare price: number;

  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare category_id: number;

  @ForeignKey(() => Salesman)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare salesman_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Salesman)
  salesman: Salesman;

  @HasMany(() => SolidProduct, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  solid_product: SolidProduct[];
}
