import { Repository } from "typeorm";
import { CartItem } from "../entities/Cart.Entity";



export type CartRepo = Repository<CartItem>