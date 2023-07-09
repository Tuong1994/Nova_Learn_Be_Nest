export class QueryDto {
  page?: string;
  limit?: string;
  keyword?: string;
  sortBy?: string;

  ids?: string;
  studentId?: string;
  courseId?: string;
  outputId?: string;

  projects?: boolean;
  outputs?: boolean;
  topics?: boolean;
  duration?: boolean;
  classes?: boolean;
  tags?: boolean;
}
