import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection } from 'src/connection/connection';
import { mailService, MailService } from 'src/mail/mail.service';
import {
  createUserRepository,
  UserRepository,
} from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
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
    MemberService,
  ],
})
export class UserModule {}
