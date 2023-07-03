import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaService) {}

    async getStudents() {
        try {
            
        } catch (error) {
            
        }
    }
}