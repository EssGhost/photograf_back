import { models } from "src/models/entities/model.entity";
import { users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class contracts {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    placa: string;
    
    @Column()
    panoramica: boolean;
    
    @Column()
    ampliacion: boolean;

    @Column()
    agradecimiento: boolean;
    
    @Column()
    individual: boolean;
    
    @Column()
    diploma: boolean;
    
    @Column()
    convencional: boolean;
    
    @Column()
    specification: string;
    
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

    @Column('decimal', { precision: 10, scale: 2 })
    cost: number; // Monto de la transacción
    
    @OneToOne(() => users, user => user.contract)
    @JoinColumn()
    user: users;

    @ManyToOne(() => models, model => model.contract)
    model: models;
}
