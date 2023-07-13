import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { IPaging } from 'common/interface/base';
import { QueryDto } from 'src/common/dto/base.dto';
import { CreateStudentDto, UpdateStudentDto } from 'src/common/dto/student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageDto } from 'src/common/dto/image.dto';
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
      select: {
        id: true,
        account: true,
        firstName: true,
        lastName: true,
        fullName: true,
        phone: true,
        email: true,
        gender: true,
        birthday: true,
        address: true,
        cityCode: true,
        districtCode: true,
        wardCode: true,
        fullAddressEng: true,
        fullAddressVn: true,
        role: true,
        avatar: true,
      },
    });

    return student;
  }

  async createStudent(file: Express.Multer.File, student: CreateStudentDto) {
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

    const existAcc = await this.prisma.student.findUnique({ where: { account: String(account) } });

    if (existAcc) throw new HttpException('Account is already exist', HttpStatus.BAD_REQUEST);

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
        birthday,
        address,
        cityCode,
        districtCode,
        wardCode,
        fullName: name,
        fullAddressEng: addr.fullAddressEng,
        fullAddressVn: addr.fullAddressVn,
        gender: Number(gender),
        role: Number(role),
      },
    });

    if (newStudent) {
      if (file) {
        const image = helper.getImage({ t: 'single', f: file }) as ImageDto;

        const data = { ...image, studentId: newStudent.id };

        await this.prisma.image.create({ data });
      }
    }

    return newStudent;
  }

  async updateStudent(query: QueryDto, file: Express.Multer.File, student: UpdateStudentDto) {
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
        birthday,
        address,
        cityCode,
        districtCode,
        wardCode,
        role: Number(role),
        gender: Number(gender),
        fullName: name,
        fullAddressEng: addr.fullAddressEng,
        fullAddressVn: addr.fullAddressVn,
      },
    });

    if (file) {
      const image = helper.getImage({ t: 'single', f: file }) as ImageDto;

      const data = { ...image, studentId: String(studentId) };

      const student = await this.prisma.student.findUnique({
        where: { id: String(studentId) },
        select: { avatar: true },
      });

      if (student) {
        if (student.avatar) {
          utils.removeFile(student.avatar.removePath);

          await this.prisma.image.update({
            where: { id: student.avatar.id },
            data,
          });
        } else {
          await this.prisma.image.create({ data });
        }
      }
    }

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
