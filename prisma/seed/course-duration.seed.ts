import { CourseDuration } from '@prisma/client';

const courseDuration: CourseDuration[] = [
  {
    id: 'CD_0001',
    month: 6,
    week: 24,
    session: 72,
    courseId: 'C_0001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default courseDuration;
