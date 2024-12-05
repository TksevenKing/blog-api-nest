import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comment.entity";


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

    @OneToMany(type => CommentEntity, comment => comment.article)
    comments: CommentEntity;


}