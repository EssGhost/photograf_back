import { Role } from "../../auth/common/enums/role.enum";
import { contracts } from "../../contracts/entities/contract.entity";
import { courtesies_by_user } from "../../courtesies_by_user/entities/courtesies_by_user.entity";
import { credentials } from "../../credentials/entities/credential.entity";
import { groups } from "../../groups/entities/group.entity";
import { payments } from "src/payments/entities/payment.entity";
import { photos } from "src/photos/entities/photo.entity";
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

    @Column({nullable: true})
    instagram: string;

    @Column({nullable: true})
    facebook: string;

    @Column('float')
    toga: number;

    @Column({ default: true })
    status: boolean;

    @Column({ type: 'enum', default: Role.USER, enum: Role})
    role : string;

    @ManyToOne(() => groups, group => group.user)
    group: groups;

    @ManyToOne(() => payments, (pay) => pay.user, { nullable: true })
    pay: payments;

    @OneToMany(() => photos, (photo) => photo.user)
    photos: photos[];

    @OneToMany(() => photos, (photo) => photo.user)
    photo: photos[];

    @OneToMany(() => courtesies_by_user, courtesy_by_user => courtesy_by_user.user)
    courtesy_by_user: courtesies_by_user[];

    @OneToOne(() => contracts, contract => contract.user)
    contract: contracts;
    
    @OneToOne(() => credentials, credential => credential.user)
    credential: credentials;
}
