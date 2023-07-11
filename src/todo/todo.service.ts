import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskToDo } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { ToDoDto } from 'src/common/dto/todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class TaskToDoService {
  constructor(private prisma: PrismaService) {}

  async getToDosPaging(query: QueryDto) {
    const { page, limit } = query;

    const toDos = await this.prisma.taskToDo.findMany();

    let collection: IPaging<TaskToDo> = helper.getDefaultCollection();

    if (toDos && toDos.length) collection = utils.paging<TaskToDo>(toDos, page, limit);

    return collection;
  }

  async getToDo(query: QueryDto) {
    const { todoId } = query;

    const toDo = await this.prisma.taskToDo.findUnique({ where: { id: String(todoId) } });

    return toDo;
  }

  async createToDo(toDo: ToDoDto) {
    const { contentEng, contentVn, taskId } = toDo;

    const newToDo = await this.prisma.taskToDo.create({
      data: { contentEng, contentVn, taskId },
    });

    return newToDo;
  }

  async updateToDo(query: QueryDto, toDo: ToDoDto) {
    const { todoId } = query;
    const { contentEng, contentVn, taskId } = toDo;

    await this.prisma.taskToDo.update({
      where: { id: String(todoId) },
      data: { contentEng, contentVn, taskId },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeToDo(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const toDos = await this.prisma.taskToDo.findMany({ where: { id: { in: listId } } });

    if (toDos && toDos.length) {
      await this.prisma.taskToDo.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Task to do not found', HttpStatus.NOT_FOUND);
  }
}
