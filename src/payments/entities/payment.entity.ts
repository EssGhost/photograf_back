import { contracts } from "src/contracts/entities/contract.entity";
import { users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentState } from "../payment-state.enum";

@Entity()
export class payments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum', // Define la columna como un enum en la base de datos
        enum: PaymentState,
        default: PaymentState.PENDIENTE,
      })
      state: PaymentState;
    @Column()
    method: string; // Método de pago

    @Column({ type: 'timestamp' })
    pay_date: Date;

    @Column()
    external_transaction_id: string;
    
    @ManyToOne(() => contracts, { nullable: false }) // Relación con contracts
    @JoinColumn()
    contract: contracts; // Relaciona el pago con un contrato específico
    
    @ManyToOne(() => users, (user) => user.pay, { nullable: true })
    user: users;

    @Column({ nullable: true })
    clientSecret: string;  // Guardar el clientSecret de Stripe
}
