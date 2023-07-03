import { CourseProject } from '@prisma/client';

const courseProject: CourseProject[] = [
  {
    id: 'CP_0001',
    name: 'AirBnB',
    descriptEng:
      'Create a system like AirBnB, which helps connect Tenants and Tenants, as well as creating opportunities for Freelance Photographers to take pictures of houses, places, and surrounding landscapes',
    descriptVn:
      'Tạo một hệ thống như AirBnB, giúp connect Người cho thuê và Người thuê địa điểm, cũng như là tạo cơ hội cho các Freelance Photographer chụp hình nhà, địa điểm, và phong cảnh xung quanh',
    courseId: 'C_0001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'CP_0002',
    name: 'Jira',
    descriptEng:
      'Create apps like Jira, to manage projects and work flow systematically. Jira focuses on supporting Scrum and Agile process management, including task management tools such as Kanban, Backlog creation',
    descriptVn:
      'Tạo ứng dụng như Jira, nhằm quản lý dự án và flow công việc một cách hệ thống. Jira tập trung vào việc hỗ trợ quản lí theo quy trình Scrum và Agile, gồm các công cụ quản lí task như Kanban, tạo Backlog',
    courseId: 'C_0001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'CP_0003',
    name: 'Fiverr',
    descriptEng:
      'Create an app like Fiverr, a platform for freelancers to exchange and offer their services to clients across the country',
    descriptVn:
      'Tạo ứng dụng như Fiverr, một nền tảng cho các freelancers có thể trao đổi và cung cấp dịch vụ của mình cho khách hàng trên toàn quốc',
    courseId: 'C_0001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'CP_0004',
    name: 'E-Learning',
    descriptEng:
      'Create an E-Learning system for online courses, manage courses and current students',
    descriptVn:
      'Tạo một hệ thống E-Learning khoá học trực tuyến, quản lý các khoá học và học viên đang theo học',
    courseId: 'C_0001',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default courseProject;
