import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'admin' })
export class Admin extends Model {
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
}
