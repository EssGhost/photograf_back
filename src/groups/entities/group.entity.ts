import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class groups {
    @PrimaryGeneratedColumn()
    id:number;

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

    //@foreign key
    //registered by
}
