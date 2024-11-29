import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('articles')
export class articleEntity{

    @PrimaryGeneratedColumn({name:'articleId'})
    id: number;
    @Column()
    title: string;
    @Column({type: 'text',name:'corps'})
    body: string;

    @CreateDateColumn()
    createdAt: Date;
    @Column({type: 'boolean',default:true})
    published : boolean;

    @Column({type:'int',default: 0})
    likes: Number;


}