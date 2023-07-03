import { ClassRoom } from '@prisma/client';

const classRoom: ClassRoom[] = [
  {
    id: 'CLR_0001',
    name: 'Bootcamp - Front End 01',
    openDate: "01/07/2023",
    time: "T2, T4, T6 - 7:30pm",
    location: 1,
    courseId: 'C_0001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'CLR_0002',
    name: 'Bootcamp - Front End 02',
    openDate: "01/07/2023",
    time: "T3, T5, T7 - 7:30pm",
    location: 2,
    courseId: 'C_0001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default classRoom