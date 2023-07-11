import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { CreateStudentDto, UpdateStudentDto } from 'src/common/dto/student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import utils from 'src/common/utils';
import helper from 'src/common/helper';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getStudentsPaging(query: QueryDto) {
    const { page, limit } = query;

    const students = await this.prisma.student.findMany();

    let collection: IPaging<Student> = helper.getDefaultCollection();

    if (students && students.length) collection = utils.paging<Student>(students, page, limit);

    return collection;
  }

  async getStudent(query: QueryDto) {
    const { studentId } = query;

    const student = await this.prisma.student.findUnique({
      where: { id: String(studentId) },
    });

    return student;
  }

  async createStudent(student: CreateStudentDto) {
    const {
      account,
      password,
      firstName,
      lastName,
      phone,
      email,
      gender,
      birthday,
      address,
      cityCode,
      districtCode,
      wardCode,
      role,
    } = student;

    const addr = await helper.getFullAddress(address, cityCode, districtCode, wardCode);

    const name = helper.getFullName(firstName, lastName);

    const newStudent = await this.prisma.student.create({
      data: {
        account,
        password: utils.hash(password),
        firstName,
        lastName,
        phone,
        email,
        gender,
        birthday,
        address,
        cityCode,
        districtCode,
        wardCode,
        fullName: name,
        fullAddressEng: addr.fullAddressEng,
        fullAddressVn: addr.fullAddressVn,
        role,
      },
    });

    return newStudent;
  }

  async updateStudent(query: QueryDto, student: UpdateStudentDto) {
    const { studentId } = query;
    const {
      firstName,
      lastName,
      phone,
      email,
      gender,
      birthday,
      address,
      cityCode,
      districtCode,
      wardCode,
      role,
    } = student;

    const addr = await helper.getFullAddress(address, cityCode, districtCode, wardCode);

    const name = helper.getFullName(firstName, lastName);

    await this.prisma.student.update({
      where: { id: String(studentId) },
      data: {
        firstName,
        lastName,
        phone,
        email,
        gender,
        birthday,
        address,
        cityCode,
        districtCode,
        wardCode,
        role,
        fullName: name,
        fullAddressEng: addr.fullAddressEng,
        fullAddressVn: addr.fullAddressVn,
      },
    });

    throw new HttpException('Update success', HttpStatus.OK);
  }

  async removeStudent(query: QueryDto) {
    const { ids } = query;

    const listId = String(ids).split(',');

    const students = await this.prisma.student.findMany({ where: { id: { in: listId } } });

    if (students && students.length) {
      await this.prisma.student.deleteMany({ where: { id: { in: listId } } });

      throw new HttpException('Remove success', HttpStatus.OK);
    }

    throw new HttpException('Students not found', HttpStatus.NOT_FOUND);
  }
}
