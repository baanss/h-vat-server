import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './schemas/notification.schema';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService, //
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Notification' })
  @ApiResponse({ status: 200, description: 'OK' })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    await this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch Notifications' })
  @ApiResponse({
    status: 200,
    description: 'Fetch All Notifications',
    type: [Notification],
  })
  async findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch Notification by _id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: `Notification's '_id' Value(to Fetch)`,
  })
  @ApiResponse({
    status: 200,
    description: 'Fetch One Notification',
    type: Notification,
  })
  async findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `Notification's '_id' Value(to Delete)`,
  })
  async delete(@Param('id') id: string) {
    return this.notificationsService.delete(id);
  }
}
