import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { PrismaClient, ServicioRequerido } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FormularioService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('FormularioService');

  constructor(private readonly usersService: UsersService) {
    super();
  }

  onModuleInit() {
      this.$connect();
      this.logger.log('Formulario Connected to DB');
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
      // Buscar usuario por email
      let usuario = await this.usersService.findByEmail(createFormularioDto.email).catch(() => null);
      
      // Si no existe, crearlo sin contraseña
      if (!usuario) {
        usuario = await this.usersService.create({
          email: createFormularioDto.email,
          nombre: createFormularioDto.nombreCompleto.split(' ')[0], // Extraer nombre del campo completo
          apellido: createFormularioDto.nombreCompleto.split(' ')[1] || '',
          edad: 0,
          password: '',
        });
      }

      return this.formulario.create({
        data: {
          ...createFormularioDto,
          usuarioId: usuario.id, // Relacion del formulario con el usuario
        },
      });
    } catch (error) {
      this.logger.error(`Error creating form: ${error.message}`);
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
