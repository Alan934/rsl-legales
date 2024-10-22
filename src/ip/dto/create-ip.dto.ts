import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateIpDto {
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    ip?: string;
}