import { IsNotEmpty, IsString } from "class-validator";

export class CreateCatalogDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
