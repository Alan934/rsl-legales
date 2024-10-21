import { HttpException, HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';


import { envs } from 'src/config';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit{

    private readonly logger = new Logger('Auth Service');

    constructor(private readonly jwtService: JwtService) {super()}

    onModuleInit() {
        this.$connect();
        this.logger.log('PostgresDB connected');
    }

    async signJWT(payload : JwtPayload) {
        return this.jwtService.sign(payload, {secret: envs.secret_key});
    }

    async verifyToken(token : string) {
        try {
            const {sub, iat, exp, ...user} = this.jwtService.verify(token, {
                secret: envs.secret_key,
            });

            return {
                user: user,
                token: await this.signJWT(user),
            }


        } catch (error) {
              throw new Error(error.message);
        }
        
    }

    async registerUser(registerUserDto: RegisterUserDto) {

        const {email, name, password} = registerUserDto;

        try {
            
            const user = await this.auth.findUnique({
                where: {
                    email
                }
            })

            if(user) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'User already registered',
                  }, HttpStatus.BAD_REQUEST, {
                    cause: 'User already registered'
                  });
            }

            const newUser = await this.auth.create({
                data: {
                    email: email,
                    name: name,
                    password: bcrypt.hashSync(password,10),
                }
            })

            const { password: __, ...rest} = newUser;

            return {
                user: rest,
                token: await this.signJWT( rest ),
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async loginUser(loginUserDto: LoginUserDto) {

        const {email, password} = loginUserDto;
        try {
            
            const user = await this.auth.findUnique({
                where: { email: email}
            })
            
            if(!user) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'User not found',
                  }, HttpStatus.BAD_REQUEST, {
                    cause: 'User not found'
                  });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if(!isPasswordValid) {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Invalid Password',
                  }, HttpStatus.BAD_REQUEST, {
                    cause: 'Invalid Password'
                  });
            }

            const { password: __, ...rest} = user;

            return {
                user: rest,
                token: await this.signJWT( rest ),
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }



}
