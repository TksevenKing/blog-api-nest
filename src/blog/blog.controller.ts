import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { articleDto } from 'src/dtos/article.dto';

@Controller('blog')
export class BlogController {

    constructor(private readonly blogService: BlogService) { }
    @Get()
    getAll() {
        Logger.log('get All articles', 'BlogController'); // Ceci permet d'afficehr un message dans le terminale quand  getAll() est appele (le second param 'BlogController' apparait en jaune)
        return this.blogService.getArticles();
    }
    @Get(':articleId')
    async getOne(@Param('articleId') articleId) { // ici on ne met pas ":" devant articleId
        Logger.log('get one article', 'BlogController');
        const article = await this.blogService.getOneArticle(articleId);   // return `le produit avec le l'id : ${articleId}`;
        if (!article) {

            throw new NotFoundException(`Article with id ${articleId} not found`); // on peut utiliser httpException Mais avec NestJs c'est mieux d'utiliser "notFoundException"
        }
        return article;

    }
    @Post()
    async createArticle(@Body() articleDto: articleDto) { // Dto: data transfer object (format a preciser plutard) // on a preciser le format dans le doc "dtos" fichier "article.dto.ts" qu'on import ici
        Logger.log('create article', 'BlogController');
        const article = await this.blogService.createArticle(articleDto);
        if (!article) {
            throw new HttpException('not created', HttpStatus.NOT_MODIFIED);
        }
        return article;
    }
    @Put(':articleId')
    async updateArticle(@Param('articleId') articleId, @Body() articleDto) {
        Logger.log('mise a jour article', 'BlogController');
        // return `artilce ${articleId} mise a jour avec succes`;
        const newArticle = await this.blogService.updateArticle(articleId, articleDto);
        if (!newArticle) {
            throw new HttpException('Not updated', HttpStatus.NOT_MODIFIED);
        }
        return newArticle;
    }
    @Delete(':articleId')
    async deleteArticle(@Param('articleId') articleId) {
        Logger.log('delete article', 'BlogController');
        const article = await this.blogService.deleteArticle(articleId);
        if (!article) {
            throw new HttpException('not founded to deleted', HttpStatus.NOT_FOUND);
        }
        return article;
    }
    // NB: implementer le contenu des fonctions precedentes dans le service BlogService 
    // acces a la base de donne TypeORM : object relationnal Model  ok commit retest
}
