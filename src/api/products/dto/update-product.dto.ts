import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsOptional, IsObject } from 'class-validator';
import { IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsString()
    title: string
    @IsOptional()
    @IsObject()
    info: object
    @IsOptional()
    @IsNumber()
    price: number
    @IsOptional()
    @IsString()
    photo: string
    @IsOptional()
    @IsString()
    brand: string
    @IsOptional()
    @IsString()
    category: string
    @IsOptional()
    @IsString()
    description: string
}
