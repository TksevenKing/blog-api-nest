import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { articleEntity } from "./article.entity";

@Entity('comments')
export class CommentEntity{
    @PrimaryGeneratedColumn({name: 'comment_id'})
    id: number;
    
    @Column({type: 'text'})
    message: String;
   
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => articleEntity, article => article.comments, {onDelete: "CASCADE"}) // "CASCADE" pour que quand on supprime un article, le comment associe a ce article aussi soit supprimer 
    article: articleEntity;

}