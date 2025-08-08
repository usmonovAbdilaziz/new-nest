import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolidProductService } from './solid-product.service';
import { CreateSolidProductDto } from './dto/create-solid-product.dto';
import { UpdateSolidProductDto } from './dto/update-solid-product.dto';

@Controller('solid-product')
export class SolidProductController {
  constructor(private readonly solidProductService: SolidProductService) {}

  @Post()
  create(@Body() createSolidProductDto: CreateSolidProductDto) {
    return this.solidProductService.create(createSolidProductDto);
  }

  @Get()
  findAll() {
    return this.solidProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solidProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolidProductDto: UpdateSolidProductDto) {
    return this.solidProductService.update(+id, updateSolidProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solidProductService.remove(+id);
  }
}
