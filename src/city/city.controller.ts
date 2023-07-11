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
import { CityService } from './city.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { CityDto } from 'src/common/dto/city.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/city')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get('listPaging')
  getCitiesPaging(@QueryPaging() query: QueryDto) {
    return this.cityService.getCitiesPaging(query);
  }

  @Get('detail')
  getCity(@Query() query: QueryDto) {
    return this.cityService.getCity(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createCity(@Body() city: CityDto) {
    return this.cityService.createCity(city);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateCity(@Query() query: QueryDto, @Body() city: CityDto) {
    return this.cityService.updateCity(query, city);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeCity(@Query() query: QueryDto) {
    return this.cityService.removeCity(query);
  }
}
