import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./BasicEntity";
import { User } from "./User.entity";
import { CartItem } from "./Cart.Entity";



@Entity({name: "purchases"})
export class Purchase extends BaseEntity {
    @ManyToOne(() => User, user => user, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    user: User 
    @Column({name: "status", default: "waiting"})
    status: "waiting" | "progress" | "delivered"
    @Column({type: "jsonb"})
    location : {
        city: string,
        district: string,
        street: string,
        avenue: string
    }
    @Column({nullable: false})
    cart_number: number
    @Column({nullable: false})
    secret_key: number
    @OneToMany(() => CartItem, cartItem => cartItem.purchase, { eager: true })
    cartItems: CartItem[];
    @Column({nullable: false})
    total: number
    @Column({default: false})
    canceled: boolean
}

