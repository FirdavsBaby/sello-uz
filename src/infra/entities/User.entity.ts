import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BasicEntity";
import { Like } from "./Like.Entity";
import { CartItem } from "./Cart.Entity";
import { Review } from "./Review.Entity";
import { Purchase } from "./Purchase.Entity";

@Entity({name: "users"})
export class User extends BaseEntity {
    @Column({nullable: true})
    username: string
    @Column({nullable: false})
    email: string
    @Column({nullable: true})
    first_name: string
    @Column({nullable: true})
    last_name: string
    @Column({nullable: true})
    number: string
    @Column({nullable: true, default: 'male'})
    gender: 'male' | 'female'
    @Column({nullable: true})
    birth: Date
    @Column({nullable: true, default: 'english'})
    language: 'english' | 'russian' | 'uzbek'
    @Column({nullable: true})
    photo: string
    @Column({nullable: true})
    password: string
    @Column({default: false, nullable: true})
    isVerified: boolean
    @Column({default: "user", nullable: true})
    role: string
    @Column({default: 0})
    balance: number
    @OneToMany(() => Like, (like) => like.user)
    like: Like[];
    @OneToMany(() => CartItem, (cart) => cart.user)
    @JoinColumn({name: "cart"})
    cart: CartItem[];
    @OneToMany(() => Review, (review) => review.user)
    review: Review
    @OneToMany(() => Purchase, (purchase) => purchase)
    purchase: Purchase
}