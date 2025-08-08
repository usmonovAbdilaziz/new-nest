import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table({ tableName: 'salesman' })
export class Salesman extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  declare username: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare full_name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  declare phone_number: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare address: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare password: string;

  @HasMany(() => Product)
  product: Product;
}
