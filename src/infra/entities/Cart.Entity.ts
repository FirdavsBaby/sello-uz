import {Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User.entity";
import { Product } from "./Product.entity";
import { BaseEntity } from "./BasicEntity";
import { Purchase } from "./Purchase.Entity";



@Entity({name: "carts"})
export class CartItem extends BaseEntity {
    @ManyToOne(() => Product, (product) => product.id, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({ name: "product_id" })
    product: Product;
    @ManyToOne(() => User, (user) => user.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    user: User;
    @Column({default: 1})
    count: number
    @Column({default: false})
    purchased: boolean
    @ManyToOne(() => Purchase, purchase => purchase.cartItems, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    purchase: Purchase;
}