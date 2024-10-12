import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class users {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;
}
