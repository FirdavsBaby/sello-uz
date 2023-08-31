import { IsDate, IsNotEmpty, IsNumber,  IsString, IsDateString } from "class-validator";

export class CreateDiscountDto {
    @IsNumber()
    @IsNotEmpty()
    percent: number
    @IsString()
    @IsNotEmpty()
    product_id: string
    @IsDateString()
    @IsNotEmpty()
    end_date: Date
}
