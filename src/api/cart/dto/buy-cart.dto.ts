import { IsArray, IsBoolean, IsOptional } from "class-validator";
import { CartItem } from "src/infra/entities/Cart.Entity";



export class BuyCartDto {
    @IsArray()
    @IsOptional()
    cart: Array<CartItem>
    @IsBoolean()
    @IsOptional()
    all: boolean
}