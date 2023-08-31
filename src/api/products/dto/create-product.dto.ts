import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    title: string
    @IsNotEmpty()
    @IsObject()
    info: object
    @IsNotEmpty()
    @IsNumber()
    price: number
    @IsNotEmpty()
    @IsString()
    photo: string
    @IsNotEmpty()
    @IsString()
    brand: string
    @IsNotEmpty()
    @IsString()
    category: string
    @IsNotEmpty()
    @IsString()
    description: string
}
