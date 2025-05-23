import { courtesies } from "src/courtesies/entities/courtesy.entity";
import { courtesies_by_user } from "src/courtesies_by_user/entities/courtesies_by_user.entity";
import { groups } from "src/groups/entities/group.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class courtesies_by_group {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => groups, group => group.courtesy_by_group)
    group: groups;

    @ManyToOne(() => courtesies, courtesy => courtesy.courtesy_by_group)
    courtesy: courtesies;

    @OneToMany(() => courtesies_by_user, courtesy_by_user => courtesy_by_user.courtesy_by_group)
    courtesy_by_user: courtesies_by_user[];
}