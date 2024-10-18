import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { AuthGuard } from 'src/auth/guards';

@Controller('formulario')
export class FormularioController {
  constructor(private readonly formularioService: FormularioService) {}

  @Post()
  create(@Body() createFormularioDto: CreateFormularioDto) {
    return this.formularioService.create(createFormularioDto);
  }

  @Get('servicios-requeridos')
  getServicioRequeridoEnum() {
    return this.formularioService.getAllServicios();
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.formularioService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formularioService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormularioDto: UpdateFormularioDto) {
    return this.formularioService.update(+id, updateFormularioDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formularioService.remove(+id);
  }
}
