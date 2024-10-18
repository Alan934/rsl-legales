import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }
  
  @Get('count')
  async countUsers() {
      return await this.usersService.getUsersWithIncrement();
  }
  
  @Get('random-number')
  getRandomNumber() {
    return { randomNumber: this.usersService.getRandomNumber() };
  }

  @Get('countsignature')
  async countSignatures() {
      return await this.usersService.getSignaturesCount();
  }

  @Get('countrecord')
  async countRecord() {
      return await this.usersService.getRecordsCount();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.getOne(Number(id));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(Number(id));
  }
  
}
