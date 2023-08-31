import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column({name: "created_at", type: Date, default: () => "CURRENT_TIMESTAMP", nullable: false})
    createdAt: number
    @Column({name: "updated_at", type: Date, default: () => "CURRENT_TIMESTAMP", nullable: false})
    updatedAt: number
}