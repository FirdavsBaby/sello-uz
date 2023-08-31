import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class UpdateBalance {
    @IsNumber()
    @IsNotEmpty()
    amount: number
    @IsString()
    @IsNotEmpty()
    id: string
}
