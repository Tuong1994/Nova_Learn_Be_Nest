import { Controller, Post, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { Roles } from 'src/common/decorator/role.decorator';
import { ERole } from 'common/enum/student';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { RegistrationDto } from 'src/common/dto/registration.dto';

@Controller('api/registraion')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  @Roles(ERole.STUDENT, ERole.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  regisration(@Body() registration: RegistrationDto) {
    return this.registrationService.registration(registration);
  }
}
