import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async getHello() {
    return '🔥h-vat-server renewal : in progress!🥲';
  }
}
