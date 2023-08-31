import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    commentary: string
    @IsString()
    @IsNotEmpty()
    product_id: string
    @IsNumber()
    @IsNotEmpty()
    star: number
    @IsOptional()
    @IsString()
    photo: string
}
