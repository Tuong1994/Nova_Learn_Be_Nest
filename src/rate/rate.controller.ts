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
import { RateService } from './rate.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { RateDto } from 'src/common/dto/rate.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/rate')
export class RateController {
  constructor(private rateService: RateService) {}

  @Get('listPaging')
  getRatesPaging(@QueryPaging() query: QueryDto) {
    return this.rateService.getRatesPaging(query);
  }

  @Get('detail')
  getRate(@Query() query: QueryDto) {
    return this.rateService.getRate(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createRate(@Body() rate: RateDto) {
    return this.rateService.createRate(rate);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateRate(@Query() query: QueryDto, @Body() rate: RateDto) {
    return this.rateService.updateRate(query, rate);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeRate(@Query() query: QueryDto) {
    return this.rateService.removeRate(query);
  }
}
