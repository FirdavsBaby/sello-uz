import { IsDate, IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreatePurchaseDto {
    @IsObject()
    @IsNotEmpty()
    location: {
        city: string,
        district: string,
        street: string,
        avenue: string
    };
}