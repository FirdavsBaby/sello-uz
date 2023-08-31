import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    password: string
    @IsOptional()
    @IsString()
    email: string
    @IsOptional()
    @IsString()
    username: string
    @IsOptional()
    @IsString()
    first_name: string
    @IsOptional()
    @IsString()
    last_name: string
    @IsOptional()
    @IsString()
    number: string
    @IsOptional()
    @IsString()
    gender: "male" | "female"
    @IsOptional()
    @IsString()
    birth: Date
    @IsOptional()
    @IsString()
    language: "english" | "russian" | "uzbek"
    @IsOptional()
    @IsString()
    photo: string
}
