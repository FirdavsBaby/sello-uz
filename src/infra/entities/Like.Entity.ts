import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./BasicEntity";
import { Product } from "./Product.entity";
import { User } from "./User.entity";



@Entity({name: "likes"})
export class Like extends BaseEntity {
    @ManyToOne(() => Product, (product) => product.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    @JoinColumn({ name: "product_id" })
    product: Product;
    @ManyToOne(() => User, (user) => user.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    user: User;
}