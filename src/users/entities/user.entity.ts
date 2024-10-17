import { contracts } from "src/contracts/entities/contract.entity";
import { courtesies_by_user } from "src/courtesies_by_user/entities/courtesies_by_user.entity";
import { credentials } from "src/credentials/entities/credential.entity";
import { groups } from "src/groups/entities/group.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class users {
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
    phone: string;

    @Column()
    tag: boolean;

    @Column()
    instagram: string;

    @Column()
    facebook: string;

    @Column('float')
    toga: number;

    @Column({ default: true })
    status: boolean;

    @ManyToOne(() => groups, group => group.user)
    group: groups;

    @OneToMany(() => courtesies_by_user, courtesie_by_user => courtesie_by_user.user)
    courtesie_by_user: courtesies_by_user[];

    @OneToOne(() => contracts, contract => contract.user)
    contract: contracts;
    
    @OneToOne(() => credentials, credential => credential.user)
    credential: credentials;

}
