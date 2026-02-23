import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Post('/')
  create(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Patch('/:id')
  update(
    @Param('id') id: number,
    @Body() body: Partial<CreateTaskDto>,
    ) {
      return this.taskService.update(Number(id), body);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.taskService.remove(Number(id));
  }
}
