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
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { DistrictService } from './district.service';
import { DistrictDto } from 'src/common/dto/district.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/district')
export class DistrictController {
  constructor(private districtService: DistrictService) {}

  @Get('listPaging')
  getDistrictsPaging(@QueryPaging() query: QueryDto) {
    return this.districtService.getDistrictsPaging(query);
  }

  @Get('detail')
  getDistrict(@Query() query: QueryDto) {
    return this.districtService.getDistrict(query);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createDistrict(@Body() district: DistrictDto) {
    return this.districtService.createDistrict(district);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateDistrict(@Query() query: QueryDto, @Body() district: DistrictDto) {
    return this.districtService.updateDistrict(query, district);
  }

  @Delete('remove')
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeDistrict(@Query() query: QueryDto) {
    return this.districtService.removeDistrict(query);
  }
}
