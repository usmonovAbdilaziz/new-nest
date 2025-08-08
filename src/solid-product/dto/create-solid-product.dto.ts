import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSolidProductDto {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  cilent_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
