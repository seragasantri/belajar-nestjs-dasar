import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import * as process from 'process';
import {
  Connection,
  MongoDBConnection,
  MySQLConnection,
} from 'src/connection/connection';
import { mailService, MailService } from 'src/mail/mail.service';
import {
  createUserRepository,
  UserRepository,
} from './user-repository/user-repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql' ? MySQLConnection : MongoDBConnection,
    },
    {
      provide: MailService,
      useValue: mailService,
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection],
    },
    {
      provide: 'EmailService',
      useExisting: MailService,
    },
  ],
})
export class UserModule {}
