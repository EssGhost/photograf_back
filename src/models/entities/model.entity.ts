import { contracts } from "src/contracts/entities/contract.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class models {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @OneToMany(() => contracts, contract => contract.id_model)
    contract: contracts[];

}
