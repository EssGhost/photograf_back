import { groups } from "src/groups/entities/group.entity";
import { users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class photos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('simple-array')
    image_urls: string[];

    @Column({nullable: true})
    category: string;

    @ManyToOne(() => users, (user) => user.photos, { nullable: true })
    user: users;

    @ManyToOne(() => groups, (group) => group.photo, { nullable: true })
    group: groups;

    //@ManyToOne(() => groups, group => group.photo)
    //id_group: groups;
}
