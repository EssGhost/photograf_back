import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class courtesies_by_group {
    @PrimaryGeneratedColumn()
    id: number;
    //Foreign key
    //id_group && id_courtesies
}
