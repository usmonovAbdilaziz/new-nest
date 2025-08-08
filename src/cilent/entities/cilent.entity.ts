import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { SolidProduct } from 'src/solid-product/entities/solid-product.entity';

@Table({ tableName: 'cilent' })
export class Cilent extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare full_name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
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
  })
  declare password: string;

  @HasMany(() => SolidProduct, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  solid_product: SolidProduct[];
}
