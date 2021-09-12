import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './datatbase/entity/User';
import { UserToken } from './datatbase/entity/UserToken';
import { Note } from './datatbase/entity/Note';
import { NoteDirectory } from './datatbase/entity/NoteDirectory';
import { NoteController } from './controller/note/note.controller';
import { AuthRequiredGuard } from './guards/AuthRequiredGuard';
import { AuthService } from './service/AuthService';
import { PasswordUtils } from './util/PasswordUtils';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      synchronize: true,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([User, UserToken, Note, NoteDirectory])
  ],
  controllers: [AppController, NoteController],
  providers: [AuthRequiredGuard, AuthService, PasswordUtils],
})
export class AppModule {}
