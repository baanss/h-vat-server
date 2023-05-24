import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'health-check h-vat-server' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async getHello() {
    return '🔥h-vat-server renewal : in progress!🥲';
  }
}
