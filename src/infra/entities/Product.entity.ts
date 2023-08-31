import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BasicEntity";
import { Brand } from "./Brand.entity";
import { Category } from "./Category.entity";
import { Discount } from "./Discount.Entity";
import { Like } from "./Like.Entity";
import { CartItem } from "./Cart.Entity";
import { Review } from "./Review.Entity";
import { Catalog } from "./Catalog.entity";



@Entity({name: "products"})
export class Product extends BaseEntity {
    @Column({nullable: false})
    title: string
    @Column({nullable: false, type: "json"})
    info: object
    @Column({nullable: false})
    price: number
    @Column({nullable: false})
    photo: string
    @Column({nullable: false})
    description: string
    @ManyToOne(()=> Brand, (brand) => brand.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    @JoinColumn({name:'brand'})
    brand: Brand
    @ManyToOne(()=> Category, (category) => category.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    @JoinColumn({name:'category'})
    category: Category
    @ManyToOne(()=> Catalog, (catalog) => catalog.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    @JoinColumn({name:'catalog'})
    catalog: Catalog
    @OneToOne(() => Discount, (discount) => discount.product, {onDelete: 'CASCADE', onUpdate: "CASCADE"})
    discount: Discount;
    @OneToMany(() => Like, (like) => like.product, {onDelete: 'CASCADE', onUpdate: "CASCADE"})
    like: Like;
    @OneToMany(() => CartItem, (cart) => cart.product, {onDelete: 'CASCADE', onUpdate: "CASCADE"})
    cart: CartItem;
    @OneToMany(() => Review, (review) => review.product, {onDelete: 'CASCADE', onUpdate: "CASCADE"})
    @JoinColumn({name: "review"})
    review: Review[]
}