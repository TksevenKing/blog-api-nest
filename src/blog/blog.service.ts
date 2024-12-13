import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { articleEntity } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { articleDto } from 'src/dtos/article.dto';
import { CommentEntity } from './entities/comment.entity';
import { commentDto } from 'src/dtos/comment.dto';

@Injectable()
export class BlogService {
    // c'est ici qu'on implemente les fonctions d'acces a la base de donnee
    // Ici on va travailler avec les repository qu'on doit injecter dans le constructeur
    constructor(
        @InjectRepository(articleEntity)
        // Pour injecter une dependance, elle doit etre de type private
        private readonly articlesRepository: Repository<articleEntity>,  // entre <> on donne les entitee qu'on va user et ceci permet de les modifier, ajouter des elts et les creer
        // c'est la declaration de ce "articlesRepository" qui nous permet d'utiliser les fonctions predefini comme "findOne()", "findAll()",etc...
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>
    ) { }
    // Now on peut creer nos methodes
    getArticles(): Promise<articleEntity[]> {       // .find() retourne tous les articles
        return this.articlesRepository.find({relations: {comments: true}}); // En ajoutant ceci permet de retourner les comments lies a l'article 
    }
    getOneArticle(id: number): Promise<articleEntity | null> {
        return this.articlesRepository.findOneBy({ id });
    }
    async createArticle(articleDto: articleDto) { // on doit specifie le schema du corps qu'il va recevoir (ici on decide de le faire dans un repertoire "dtos" dans "src" qui contiendra les models des chose qu'on va creer et on l'importe ici )
        const article = await this.articlesRepository.save(articleDto);
        return article;
    }
    async updateArticle(id: number, articleDto: articleDto) {
        const article = await this.articlesRepository.findOneBy({ id });
        if (!article) {
            return null;
        }
        const newArticle = await this.articlesRepository.update(id, articleDto);
        return await this.articlesRepository.findOneBy({ id });
    }
    async deleteArticle(id: number) {
        const article = await this.articlesRepository.findOneBy({ id });
        if (!article) {
            return null;
        }
        this.articlesRepository.remove(article);
        return article;
    }
    async addComment(id: number,commentDto: commentDto){
        const article = await this.articlesRepository.findOneBy({ id }); // car la table comment possede un champ "article" qu'on doit remplir aussi
        // Voici comment enregistrer un comment (il faut creer un objet de type "comment")
        if(!article){
            return null;
        }
        const comment = new CommentEntity();
        comment.message = commentDto.message;
        comment.article = article;
        this.commentRepository.save(comment); // ici j'enregistre le "commentaire" dans la table "comment" dans la base de donnee
        return comment;
    }

}
