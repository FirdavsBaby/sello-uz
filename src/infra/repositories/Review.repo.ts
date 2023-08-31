import { Repository } from "typeorm";
import { Review } from "../entities/Review.Entity";



export type ReviewRepo = Repository<Review>