import { courtesies_by_group } from "src/courtesies_by_group/entities/courtesies_by_group.entity";
import { users } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class courtesies_by_user {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => users, user => user.courtesie_by_user)
    id_user: users;

    @ManyToOne(() => courtesies_by_group, courtesie_by_group => courtesie_by_group.courtesie_by_user)
    id_cbg: courtesies_by_group;

}
