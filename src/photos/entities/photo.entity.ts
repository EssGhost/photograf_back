import { groups } from "src/groups/entities/group.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class photos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('simple-array')
    image_urls: string[];

    //@ManyToOne(() => groups, group => group.photo)
    //id_group: groups;
}
