import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './datatbase/entity/User';
import { UserToken } from './datatbase/entity/UserToken';
import { Note } from './datatbase/entity/Note';
import { NoteDirectory } from './datatbase/entity/NoteDirectory';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [User, UserToken, Note, NoteDirectory]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
