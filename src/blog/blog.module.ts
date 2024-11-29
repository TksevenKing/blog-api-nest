import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { articleEntity } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([articleEntity])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
