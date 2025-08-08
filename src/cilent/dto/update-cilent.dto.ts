import { PartialType } from '@nestjs/mapped-types';
import { CreateCilentDto } from './create-cilent.dto';

export class UpdateCilentDto extends PartialType(CreateCilentDto) {}
