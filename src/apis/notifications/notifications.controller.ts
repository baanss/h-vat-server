import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  Notification,
  NotificationDocument,
} from '../../commons/schemas/notification.schema';
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
  async findAll(): Promise<NotificationDocument[]> {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `Notification's '_id' Value(to Fetch)`,
  })
  @ApiOperation({ summary: 'Fetch Notification by _id' })
  @ApiResponse({
    status: 200,
    description: 'Fetch One Notification',
    type: Notification,
  })
  async findOne(@Param('id') id: string): Promise<NotificationDocument> {
    return this.notificationsService.findOne(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: `Notification's '_id' Value(to Delete)`,
  })
  @ApiOperation({ summary: 'Delete Notification by _id' })
  @ApiResponse({
    status: 200,
    description: 'Delete One Notification',
    type: Notification,
  })
  async delete(@Param('id') id: string) {
    return this.notificationsService.delete(id);
  }
}
