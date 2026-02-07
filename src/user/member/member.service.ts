import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from 'src/connection/connection';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class MemberService {
  constructor(private moduleRef: ModuleRef) {}

  getConnectionName(): any {
    const connection = this.moduleRef.get(Connection);
    return connection.getName();
  }

  sendEmail() {
    const sendMail = this.moduleRef.get(MailService);
    return sendMail.send();
  }
}
