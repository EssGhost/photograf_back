import { courtesies_by_group } from "src/courtesies_by_group/entities/courtesies_by_group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class courtesies {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => courtesies_by_group, courtesy_by_group => courtesy_by_group.courtesy)
    courtesy_by_group: courtesies_by_group[];
}
