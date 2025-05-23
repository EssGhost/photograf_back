import { admins } from 'src/admins/entities/admin.entity';
import { courtesies_by_group } from 'src/courtesies_by_group/entities/courtesies_by_group.entity';
import { photos } from 'src/photos/entities/photo.entity';
import { users } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class groups {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    groupCode: string;

    @Column()
    name: string;

    @Column()
    carrera: string;

    @Column()
    generacion: string;

    @Column()
    graduacion: string;

    @Column('date')
    entrega: Date;

    @Column({ default: true })
    status: boolean;

    @ManyToOne(() => admins, admin => admin.group, {nullable: true})
    admin?: admins;

    @OneToMany(() => users, user => user.group)
    user: users[];
    
    @OneToMany(() => photos, photo => photo.group)
    photo: photos[];
    
    // @OneToMany(() => photos, (photo) => photo.group)
    // photos: photos[];
    
    @OneToMany(() => courtesies_by_group, courtesy_by_group => courtesy_by_group.group)
    courtesy_by_group?: courtesies_by_group[];
}
