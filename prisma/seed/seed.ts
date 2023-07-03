import { PrismaClient } from '@prisma/client';
import student from './student.seed';
import course from './course.seed';
import courseDuration from './course-duration.seed';
import courseOutput from './course-output.seed';
import courseProject from './course-project.seed';
import courseTopic from './course-topic.seed';
import projectTask from './project-task.seed';
import taskTodo from './task-todo.seed';
import category from './category.seed';
import tag from './tag.seed';
import city from './city.seed';
import district from './district.seed';
import ward from './ward.seed';
import classRoom from './class.seed';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.student.createMany({ data: student });
  await prisma.category.createMany({ data: category });
  await prisma.course.createMany({ data: course });
  await prisma.courseDuration.createMany({ data: courseDuration });
  await prisma.courseOutput.createMany({ data: courseOutput });
  await prisma.courseProject.createMany({ data: courseProject });
  await prisma.projectTask.createMany({ data: projectTask });
  await prisma.taskToDo.createMany({ data: taskTodo });
  await prisma.courseTopic.createMany({ data: courseTopic });
  await prisma.classRoom.createMany({ data: classRoom });
  await prisma.tag.createMany({ data: tag });
  await prisma.city.createMany({ data: city });
  await prisma.district.createMany({ data: district });
  await prisma.ward.createMany({ data: ward });
};

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.log(err);
    prisma.$disconnect();
  })
  .finally(() => prisma.$disconnect());
