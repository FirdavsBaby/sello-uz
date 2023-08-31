import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./BasicEntity";
import { Product } from "./Product.entity";
import { User } from "./User.entity";




@Entity({name: "reviews"})
export class Review extends BaseEntity {
    @ManyToOne(() => Product, (product) => product.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    @JoinColumn({ name: "product_id" })
    product: Product;
    @OneToOne(() => User, (user) => user.id, {onDelete: "CASCADE" , onUpdate: "CASCADE"})
    @JoinColumn({ name: "user_id" })
    user: User;
    @Column({nullable: false})
    star: number
    @Column({nullable: false})
    commentary: string
    @Column({nullable: true})
    photo: string
}