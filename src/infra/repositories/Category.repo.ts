import { Repository } from "typeorm";
import { Category } from "../entities/Category.entity";



export type CategoryRepo = Repository<Category>