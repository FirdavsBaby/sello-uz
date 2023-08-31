import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./BasicEntity";
import { Product } from "./Product.entity";





@Entity({name: "discounts"})
export class Discount extends BaseEntity {
    @Column({name: "percent"})
    percent: number
    @Column({nullable: false})
    end_date: Date
    @OneToOne(() => Product, (product) => product.discount, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({ name: "product_id" })
    product: Product;
}