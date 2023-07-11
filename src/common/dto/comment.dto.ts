import { IsNotEmpty, IsOptional } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  commentText: string;

  @IsNotEmpty()
  studentId: string;

  @IsOptional()
  courseId: string;

  @IsOptional()
  blogId: string;
}
