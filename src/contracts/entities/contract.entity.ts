import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class contracts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    placa: string;
    
    @Column()
    panoramica: boolean;
    
    @Column()
    ampliación: boolean;
    
    @Column()
    individual: boolean;
    
    @Column()
    diploma: boolean;
    
    @Column()
    convencional: boolean;
    
    @Column()
    specification: boolean;
    
    @Column()
    txt1: string;

    @Column()
    dedicated1: string;

    @Column()
    txt2: string;

    @Column()
    dedicated2: string;

    @Column({ default: true })
    status: boolean;

    //Foreign key
    //id_model && id_user
}
