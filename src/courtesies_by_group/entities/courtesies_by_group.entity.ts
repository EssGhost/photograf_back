import { courtesies } from "src/courtesies/entities/courtesy.entity";
import { courtesies_by_user } from "src/courtesies_by_user/entities/courtesies_by_user.entity";
import { groups } from "src/groups/entities/group.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class courtesies_by_group {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => groups, group => group.courtesie_by_group)
    id_group: groups;

    //@ManyToOne(() => courtesies, courtesie => courtesie.courtesie_by_group)
    //id_courtesies: courtesies;

    //@OneToMany(() => courtesies_by_user, courtesie_by_user => courtesie_by_user.id_cbg)
    //courtesie_by_user: courtesies_by_user[];
}
