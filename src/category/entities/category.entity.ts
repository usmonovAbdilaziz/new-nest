import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table({ tableName: 'category' })
export class Category extends Model {
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

  @HasMany(() => Product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product[];
}
