import { Repository } from "typeorm";
import { Catalog } from "../entities/Catalog.entity";



export type CatalogRepo = Repository<Catalog>