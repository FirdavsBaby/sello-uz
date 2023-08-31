import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BasicEntity";
import { Catalog } from "./Catalog.entity";
import { Product } from "./Product.entity";



@Entity({name: "categories"})
export class Category extends BaseEntity {
    @Column({nullable: false})
    name: string
    @ManyToOne(() => Catalog, (catalog) => catalog.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    @JoinColumn({name:'catalog_id'})
    catalog_id: string
    @OneToMany(()=> Product, (product) => product.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    products: Product[]
}