import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
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
            console.log(error);
        
        }
        
    }

    async registerUser(registerUserDto: RegisterUserDto) {

        const {email, name, password} = registerUserDto;

        try {
            
            const user = await this.user.findUnique({
                where: {
                    email
                }
            })

            if(user) {
                console.log(`user already exist`)
            }

            const newUser = await this.user.create({
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
            console.log(error)
        }
    }

    async loginUser(loginUserDto: LoginUserDto) {

        const {email, password} = loginUserDto;
        try {
            
            const user = await this.user.findUnique({
                where: { email: email}
            })
            
            if(!user) {
                console.log(`User not found`)
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if(!isPasswordValid) {
                console.log(`Invalid password`)
            }

            const { password: __, ...rest} = user;

            return {
                user: rest,
                token: await this.signJWT( rest ),
            }

        } catch (error) {
            console.log(error)
        }
    }



}
