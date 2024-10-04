import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { PrismaClient, ServicioRequerido } from '@prisma/client';

@Injectable()
export class FormularioService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('UsersService');
  onModuleInit() {
      this.$connect();
      this.logger.log('Connected to DB');
  }

  //retorna [
  //   "CERTIFICACIONES",
  //   "OP_INMOBILIARIAS",
  //   "CONTRATOS_PRIVADOS"
  // ]
  getServiciosEnum() {
    let data = {
      serviciosRequeridos: []
    }
    data.serviciosRequeridos = Object.values(ServicioRequerido)
    return data
    //return Object.values(ServicioRequerido);
  }  
  
  async create(createFormularioDto: CreateFormularioDto) {
    try {
      return this.formulario.create({
          data: createFormularioDto
      });
      //return this.usuario.create({data: createUserDto});
    } catch (error) {
      throw new Error(error);
  }
  }

  async exists(id: number) {
    const product = await this.formulario.findFirst({
      where: {id}
    });
    console.log('findOne: ', product)

    if(!product){
      throw new NotFoundException(`Formulario with id ${id} was not found`);
    }
    return product
  }

  findAll() {
    try {
      return this.formulario.findMany();
    } catch (error) {
        throw new Error(error);
    }
  }

  async findOne(id: number) {
    const user = await this.formulario.findUnique({where: {id}});
        try {
            if(!user){
                throw new NotFoundException(`Formulario with ID ${id} not found`);
            }
            return user;
        } catch (error) {
            throw new Error(error);
        }
  }

  update(id: number, updateFormularioDto: UpdateFormularioDto) {
    try {
      return this.formulario.update({where: {id}, data: updateFormularioDto});
    } catch (error) {
        throw new Error(error);
    }
  }

  // soft delete, available: false
  async remove(id: number) {
    await this.findOne(id)
    const formulario = await this.formulario.update({
      where:{id},
      data:{
        available: false
      }
    })
    
    return formulario
  }

  //habilitar formulario, available: true
  async updateAvailable(id: number) {

    const formularioToUpdate = await this.exists(id)
    if(!formularioToUpdate){
      throw new NotFoundException('Product you want to update was not found');
    }

    return this.formulario.update({
      where:{ id }, 
      data:{
      available: true
      }
    })
    //return `This action updates a #${id} product`;
  }


}
