import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrationDto } from 'src/common/dto/registration.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegistrationService {
  constructor(private prisma: PrismaService) {}

  async registration(regisration: RegistrationDto) {
    const { courseId, studentId, classroomId } = regisration;

    const existRegistration = await this.prisma.registration.findUnique({ where: { courseId } });

    if (existRegistration)
      throw new HttpException("You've already register this course", HttpStatus.BAD_REQUEST);

    const newRegistration = await this.prisma.registration.create({
      data: { courseId, studentId, classroomId },
    });

    if (newRegistration) {
      const registration = await this.prisma.registration.findUnique({
        where: { id: newRegistration.id },
        include: { student: true, course: true, classroom: true },
      });

      return registration;
    }

    throw new HttpException('Registrate success', HttpStatus.CREATED);
  }
}
