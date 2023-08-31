import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';
export class CreateAuthDto {
@IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
    
}
