

import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';
export class LoginAuthDto {
@IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    password: string
}