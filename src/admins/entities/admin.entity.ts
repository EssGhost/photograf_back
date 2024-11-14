import { Role } from "../../auth/common/enums/role.enum";
import { groups } from "../../groups/entities/group.entity";
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

    @Column({ unique: true })
    email: string;

    @Column()
    username: string;

    @Column({ select: false })
    password: string;

    @Column()
    sucursal: number;

    @Column({ type: 'enum', default: Role.ADMIN, enum: Role })
    role : string;

    @OneToMany(() => groups, group => group.admin)
    group: groups[];

}