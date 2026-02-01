import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import type { HttpRedirectResponse } from '@nestjs/common';

@Controller('/api/user')
export class UserController {
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
