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
import { CategoryService } from './category.service';
import { QueryPaging } from 'src/common/decorator/query.decorator';
import { QueryDto } from 'src/common/dto/base.dto';
import { CategoryDto } from 'src/common/dto/category.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('listPaging')
  getCategoriesPaging(@QueryPaging() query: QueryDto) {
    return this.categoryService.getCategoriesPaging(query);
  }

  @Get('detail')
  getCategory(@Query() query: QueryDto) {
    return this.categoryService.getCategory(query);
  }

  @Post('create')
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  createCategory(@Body() category: CategoryDto) {
    return this.categoryService.createCategory(category);
  }

  @Put('update')
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  updateCategory(@Query() query: QueryDto, @Body() category: CategoryDto) {
    return this.categoryService.updateCategory(query, category);
  }

  @Delete('remove')
  @Roles(ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  removeCategory(@Query() query: QueryDto) {
    return this.categoryService.removeCategory(query);
  }
}
