import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CilentService } from './cilent.service';
import { CreateCilentDto } from './dto/create-cilent.dto';
import { UpdateCilentDto } from './dto/update-cilent.dto';

@Controller('cilent')
export class CilentController {
  constructor(private readonly cilentService: CilentService) {}

  @Post()
  create(@Body() createCilentDto: CreateCilentDto) {
    return this.cilentService.create(createCilentDto);
  }

  @Get()
  findAll() {
    return this.cilentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cilentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCilentDto: UpdateCilentDto) {
    return this.cilentService.update(+id, updateCilentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cilentService.remove(+id);
  }
}
