import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { WardService } from './ward.service';
import { QueryDto } from 'src/common/dto/base.dto';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { WardDto } from 'src/common/dto/ward.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/ward')
export class WardController {
  constructor(private wardService: WardService) {}

  @Get('listPaging')
  getWardsPaging(@QueryPaging() query: QueryDto) {
    return this.wardService.getWardsPaging(query);
  }

  @Get('detail')
  getWard(@Query() query: QueryDto) {
    return this.wardService.getWard(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createWard(@Body() ward: WardDto) {
    return this.wardService.createWard(ward);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateWard(@Query() query: QueryDto, @Body() ward: WardDto) {
    return this.wardService.updateWard(query, ward);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeWard(@Query() query: QueryDto) {
    return this.wardService.removeWard(query);
  }
}
