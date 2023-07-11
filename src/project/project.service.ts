import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CourseProject } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from 'src/common/dto/project.dto';
import helper from 'src/common/helper';
import utils from 'src/common/utils';

@Injectable()
export class CourseProjectService {
  constructor(private prisma: PrismaService) {}

  async getProjectsPaging(query: QueryDto) {
    const { page, limit } = query;

    const projects = await this.prisma.courseProject.findMany();

    let collection: IPaging<CourseProject> = helper.getDefaultCollection();

    if (projects && projects.length)
      collection = utils.paging<CourseProject>(projects, page, limit);

    return projects;
  }

  async getProject(query: QueryDto) {
    const { projectId } = query;

    const project = await this.prisma.courseProject.findUnique({
      where: { id: String(projectId) },
    });

    return project;
  }

  async createProject(project: ProjectDto) {
    const { name, descriptEng, descriptVn, courseId } = project;

    const newProject = await this.prisma.courseProject.create({
      data: { name, descriptEng, descriptVn, courseId },
    });

    return newProject;
  }

  async updateProject(query: QueryDto, project: ProjectDto) {
    const { projectId } = query;
    const { name, descriptEng, descriptVn, courseId } = project;

    await this.prisma.courseProject.update({
      where: { id: String(projectId) },
      data: { name, descriptEng, descriptVn, courseId },
    });

    throw new HttpException('Update Success', HttpStatus.OK);
  }

  async removeProject(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const projects = await this.prisma.courseProject.findMany({ where: { id: { in: listId } } });

    if (projects && projects.length) {
      await this.prisma.courseProject.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
  }
}
