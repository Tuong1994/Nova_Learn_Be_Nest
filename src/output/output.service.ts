import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CourseOutput } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OutputDto } from 'src/common/dto/output.dto';
import utils from 'src/common/utils';

@Injectable()
export class OutputService {
  constructor(private prisma: PrismaService) {}

  async getOuputsPaging(query: QueryDto) {
    const { page, limit } = query;

    const outputs = await this.prisma.courseOutput.findMany();

    let collection: IPaging<CourseOutput>;

    if (outputs && outputs.length) collection = utils.paging<CourseOutput>(outputs, page, limit);

    return collection;
  }

  async getOutput(query: QueryDto) {
    const { outputId } = query;

    const output = await this.prisma.courseOutput.findUnique({ where: { id: String(outputId) } });

    return output;
  }

  async createOutput(output: OutputDto) {
    const { contentEng, contentVn, courseId } = output;

    const newOutput = await this.prisma.courseOutput.create({
      data: { contentEng, contentVn, courseId },
    });

    return newOutput;
  }

  async updateOutput(query: QueryDto, output: OutputDto) {
    const { outputId } = query;
    const { contentEng, contentVn, courseId } = output;

    await this.prisma.courseOutput.update({
      where: { id: String(outputId) },
      data: { contentEng, contentVn, courseId },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeOutput(query: QueryDto) {
    const { outputId } = query;

    await this.prisma.courseOutput.delete({ where: { id: String(outputId) } });

    throw new HttpException('Remove success', HttpStatus.OK);
  }
}
