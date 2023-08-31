import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BasicEntity";
import { Product } from "./Product.entity";



@Entity({name: "brands"})
export class Brand extends BaseEntity {
    @Column({nullable:false})
    photo: string
    @Column({nullable: false})
    name: string
    @OneToMany(()=> Product, (product) => product.brand, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    products: Product[]
}