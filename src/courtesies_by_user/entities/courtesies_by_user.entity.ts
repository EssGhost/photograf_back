import { courtesies_by_group } from "src/courtesies_by_group/entities/courtesies_by_group.entity";
import { users } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class courtesies_by_user {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => users, user => user.courtesy_by_user)
    user: users;

    @ManyToOne(() => courtesies_by_group, courtesy_by_group => courtesy_by_group.courtesy_by_user)
    courtesy_by_group: courtesies_by_group;
}
