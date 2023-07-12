import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClassRoom } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import helper from 'src/common/helper';
import utils from 'src/common/utils';
import { ClassRoomDto } from 'src/common/dto/classroom.dto';

@Injectable()
export class ClassRoomService {
  constructor(private prisma: PrismaService) {}

  async getClassRoomsPaging(query: QueryDto) {
    const { page, limit } = query;

    const classRooms = await this.prisma.classRoom.findMany();

    let collection: IPaging<ClassRoom> = helper.getDefaultCollection();

    if (classRooms && classRooms.length)
      collection = utils.paging<ClassRoom>(classRooms, page, limit);

    return collection;
  }

  async getClassRoom(query: QueryDto) {
    const { classRoomId } = query;

    const classRoom = await this.prisma.classRoom.findUnique({
      where: { id: String(classRoomId) },
      include: { course: true },
    });

    return classRoom;
  }

  async createClassRoom(classRoom: ClassRoomDto) {
    const { name, openDate, location, time, courseId } = classRoom;

    const newClassRoom = await this.prisma.classRoom.create({
      data: { name, openDate, location, time, courseId },
    });

    return newClassRoom;
  }

  async updateClassRoom(query: QueryDto, classRoom: ClassRoomDto) {
    const { classRoomId } = query;
    const { name, openDate, location, time, courseId } = classRoom;

    await this.prisma.classRoom.update({
      where: { id: String(classRoomId) },
      data: { name, openDate, location, time, courseId },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeClassRoom(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const classRooms = await this.prisma.classRoom.findMany({ where: { id: { in: listId } } });

    if (classRooms && classRooms.length) {
      await this.prisma.classRoom.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Class room not found', HttpStatus.NOT_FOUND);
  }
}
