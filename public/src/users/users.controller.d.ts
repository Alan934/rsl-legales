import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(): any;
    getOne(id: number): Promise<any>;
    create(createUserDto: CreateUserDto): Promise<any>;
    update(id: number, updateUserDto: CreateUserDto): any;
    delete(id: number): Promise<any>;
}
