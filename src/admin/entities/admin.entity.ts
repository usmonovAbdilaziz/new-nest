import { Column, DataType, Table, Model } from 'sequelize-typescript';

export enum Role {
  Superadmin = 'superadmin',
  Admin = 'admin',
  User = 'user',
}
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

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.User,
  })
  declare role: Role;
}
