import { models } from "src/models/entities/model.entity";
import { users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Nombre de la entidad debe estar en minúsculas y en plural (opcional pero recomendado)
export class contracts {  // Las entidades suelen escribirse en PascalCase y en singular
    @PrimaryGeneratedColumn()
    id: number;

    // Columna string, puede ser prudente añadir validación de longitud
    @Column() 
    placa: string;
    
    // Columna booleana
    @Column({ default: false }) 
    panoramica: boolean;

    @Column({ default: false })
    ampliacion: boolean;

    @Column({ default: false })
    agradecimiento: boolean;

    @Column({ default: false })
    individual: boolean;

    @Column({ default: false })
    diploma: boolean;

    @Column({ default: false })
    convencional: boolean;

    // Columna string
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

    // Columna con valor por defecto
    @Column({ default: true })
    status: boolean;

    // Relación con users (comentada para ajustarla)
    @OneToOne(() => users)
    @JoinColumn()
    user: users;

    // Relación con models
    //@ManyToOne(() => models, model => model.contracts)
    //model: models;
}
