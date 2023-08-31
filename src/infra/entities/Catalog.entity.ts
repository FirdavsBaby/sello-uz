import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./BasicEntity";
import { Category } from "./Category.entity";




@Entity({name: "catalogs"})
export class Catalog extends BaseEntity {
    @Column({nullable: false})
    name: string
    @OneToMany(() => Category, (category) => category.catalog_id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    categories: Category[]
}