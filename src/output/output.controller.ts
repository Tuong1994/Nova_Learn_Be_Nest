import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { OutputService } from './output.service';
import { QueryDto } from 'src/common/dto/base.dto';
import { OutputDto } from 'src/common/dto/output.dto';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/output')
export class OutputController {
  constructor(private outputService: OutputService) {}

  @Get('listPaging')
  getOutputsPaging(@QueryPaging() query: QueryDto) {
    return this.outputService.getOuputsPaging(query);
  }

  @Get('detail')
  getOutput(@Query() query: QueryDto) {
    return this.outputService.getOutput(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createOutput(@Body() output: OutputDto) {
    return this.outputService.createOutput(output);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateOutput(@Query() query: QueryDto, @Body() output: OutputDto) {
    return this.outputService.updateOutput(query, output);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeOutput(@Query() query: QueryDto) {
    return this.outputService.removeOutput(query);
  }
}
