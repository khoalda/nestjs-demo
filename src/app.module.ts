import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { RunsModule } from './runs/runs.module';

@Module({
  imports: [BooksModule, RunsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
