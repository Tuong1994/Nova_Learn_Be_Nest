import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

export const QueryPaging = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  const { query } = request;

  if (Object.keys(query).length === 0)
    throw new HttpException('Query is missing', HttpStatus.BAD_REQUEST);

  const { page, limit } = query;

  if (!page || !limit)
    throw new HttpException('Page and Limit are required', HttpStatus.BAD_REQUEST);

  return query;
});
