import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from './datatbase/entity/User';
import {UserToken} from './datatbase/entity/UserToken';
import {Note} from './datatbase/entity/Note';
import {NoteDirectory} from './datatbase/entity/NoteDirectory';
import {NoteController} from './controller/note/note.directory.controller';
import {AuthController} from "./controller/auth/auth.controller";
import {AuthService} from "./service/AuthService";
import {PasswordUtils} from "./util/PasswordUtils";

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
  controllers: [NoteController, AuthController],
  providers: [AuthService, PasswordUtils],
})
export class AppModule {}
