import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class photos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    photo: string;

    //Foreign Key
    //id_group
}
