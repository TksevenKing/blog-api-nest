import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_blog_db',
      entities: [__dirname+'/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
