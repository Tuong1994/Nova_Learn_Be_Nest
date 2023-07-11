import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectTask } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from 'src/common/dto/task.dto';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class ProjectTaskService {
  constructor(private prisma: PrismaService) {}

  async getTasksPaging(query: QueryDto) {
    const { page, limit } = query;

    const tasks = await this.prisma.projectTask.findMany();

    let collection: IPaging<ProjectTask> = helper.getDefaultCollection();

    if (tasks && tasks.length) collection = utils.paging<ProjectTask>(tasks, page, limit);

    return collection;
  }

  async getTask(query: QueryDto) {
    const { taskId } = query;

    const task = await this.prisma.projectTask.findUnique({ where: { id: String(taskId) } });

    return task;
  }

  async createTask(task: TaskDto) {
    const { nameEng, nameVn, projectId } = task;

    const newTask = await this.prisma.projectTask.create({
      data: { nameEng, nameVn, projectId },
    });

    return newTask;
  }

  async updateTask(query: QueryDto, task: TaskDto) {
    const { taskId } = query;
    const { nameEng, nameVn, projectId } = task;

    await this.prisma.projectTask.update({
      where: { id: String(taskId) },
      data: { nameEng, nameVn, projectId },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeTask(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const tasks = await this.prisma.projectTask.findMany({ where: { id: { in: listId } } });

    if (tasks && tasks.length) {
      await this.prisma.projectTask.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }
}
