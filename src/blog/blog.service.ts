import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { articleEntity } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { articleDto } from 'src/dtos/article.dto';
@Injectable()
export class BlogService {
    // c'est ici qu'on implemente les fonctions d'acces a la base de donnee
    // Ici on va travailler avec les repository qu'on doit injecter dans le constructeur
    constructor(
        @InjectRepository(articleEntity)
        // Pour injecter une dependance, elle doit etre de type private
        private readonly articlesRepository: Repository<articleEntity>  // entre <> on donne les entitee qu'on va user et ceci permet de les modifier, ajouter des elts et les creer
        // c'est la declaration de ce "articlesRepository" qui nous permet d'utiliser les fonctiopns predefini comme "findOne()", "findAll()",etc...
    ) { }
    // Now on peut creer nos methodes
    getArticles(): Promise<articleEntity[]> {
        return this.articlesRepository.find(); // .find() retourne tous les articles
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

}
