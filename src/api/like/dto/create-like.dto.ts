import { IsNotEmpty, IsString } from "class-validator";

export class CreateLikeDto {
    @IsString()
    @IsNotEmpty()
    product_id: string
}
