import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class admins {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname1: string;
    
    @Column()
    lastname2: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    sucursal: number;

    //@foreign key

}