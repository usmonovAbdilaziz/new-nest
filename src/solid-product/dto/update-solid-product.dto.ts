import { PartialType } from '@nestjs/mapped-types';
import { CreateSolidProductDto } from './create-solid-product.dto';

export class UpdateSolidProductDto extends PartialType(CreateSolidProductDto) {}
