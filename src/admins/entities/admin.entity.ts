import { groups } from "src/groups/entities/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => groups, group => group.admin)
    group: groups[];

}