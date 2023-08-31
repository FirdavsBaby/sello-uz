import { Repository } from "typeorm";
import { Discount } from "../entities/Discount.Entity";



export type DiscountRepo = Repository<Discount>