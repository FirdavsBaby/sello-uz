import { Repository } from "typeorm";
import { Purchase } from "../entities/Purchase.Entity";



export type PurchaseRepo = Repository<Purchase>