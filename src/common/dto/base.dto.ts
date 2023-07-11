export class QueryDto {
  page?: string;
  limit?: string;
  keyword?: string;
  sortBy?: string;

  ids?: string;
  studentId?: string;
  courseId?: string;
  outputId?: string;
  durationId?: string;
  topicId?: string;
  projectId?: string;
  taskId?: string;
  todoId?: string;
  classRoomId?: string;
  tagId?: string;
  blogId?: string;
  commentId?: string;
  rateId?: string;
  cityId?: string;
  districtId?: string;
  wardId?: string;

  projects?: boolean;
  outputs?: boolean;
  topics?: boolean;
  duration?: boolean;
  classes?: boolean;
  tags?: boolean;
}
