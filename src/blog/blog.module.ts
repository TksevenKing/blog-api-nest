import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { articleEntity } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([articleEntity,CommentEntity])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
