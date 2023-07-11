import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CourseDurationService } from './duration.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { DurationDto } from 'src/common/dto/duration.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/duration')
export class CourseDurationController {
  constructor(private courseDurationService: CourseDurationService) {}

  @Get('listPaging')
  getDurationsPaging(@QueryPaging() query: QueryDto) {
    return this.courseDurationService.getDurationsPaging(query);
  }

  @Get('detail')
  getDuration(@Query() query: QueryDto) {
    return this.courseDurationService.getDuration(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createDuration(@Body() duration: DurationDto) {
    return this.courseDurationService.createDuration(duration);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateDuration(@Query() query: QueryDto, @Body() duration: DurationDto) {
    return this.courseDurationService.updateDuration(query, duration);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeDuration(@Query() query: QueryDto) {
    return this.courseDurationService.removeDuration(query);
  }
}
