import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    //@foreign key
}
