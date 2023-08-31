import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsString()
    catalog_id: string
}
