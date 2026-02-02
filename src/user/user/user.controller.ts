import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from 'src/connection/connection';
import { MailService } from 'src/mail/mail.service';

@Controller('/api/user')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mail: MailService,
  ) {}

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mail.send();
    return this.connection.getName();
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() res: Response) {
    res.render('index.html', {
      title: 'Template Engine',
      name: name,
    });
  }

  @Get('set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success set cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() req: Request): string {
    return req.cookies['name'];
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      data: 'HEllo Sample Response',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirectResponse(): HttpRedirectResponse {
    return {
      url: '/api/user/sampe-response',
      statusCode: 301,
    };
  }

  @Get('/hello')
  async sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<string> {
    return `Hello ${firstName} ${lastName}`;
  }

  @Get('/:id')
  getById(@Param('id') id: string): string {
    return `Get ${id}`;
  }

  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/data/sample')
  get(): string {
    return 'GET';
  }
}
