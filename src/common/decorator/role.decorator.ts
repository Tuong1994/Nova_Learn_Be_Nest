import { SetMetadata } from '@nestjs/common';
import { ERole } from 'common/enum/student';

export const Roles = (...roles: ERole[]) => SetMetadata('roles', roles);
