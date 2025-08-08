import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cilent } from 'src/cilent/entities/cilent.entity';
import { Product } from 'src/product/entities/product.entity';

@Table({ tableName: 'solid-product' })
export class SolidProduct extends Model {
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare total_price: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare quantity: number;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  declare product_id: number;

  @ForeignKey(() => Cilent)
  @Column({
    type: DataType.INTEGER,
  })
  declare cilent_id: number;

  @BelongsTo(() => Product)
  declare prduct: Product;

  @BelongsTo(() => Cilent)
  declare cilent: Cilent;
}
