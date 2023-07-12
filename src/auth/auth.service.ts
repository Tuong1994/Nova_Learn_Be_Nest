import * as bcryptjs from 'bcryptjs';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from 'src/common/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenExpiredError } from 'jsonwebtoken';
import { Student } from '@prisma/client';
import { Response, Request } from 'express';
import { ERole } from 'common/enum/student';
import { TokenPayload } from 'common/interface/auth';
import utils from 'src/common/utils';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  getAccessToken(payload: TokenPayload) {
    const token = this.jwt.signAsync(payload, {
      secret: this.config.get('ACCESS_TOKEN_SECRET'),
      expiresIn: '24h',
    });

    return token;
  }

  getRefreshToken(payload: TokenPayload) {
    const token = this.jwt.signAsync(payload, {
      secret: this.config.get('REFRESH_TOKEN_SECRET'),
      expiresIn: '24h',
    });

    return token;
  }

  async signUp(auth: SignUpDto) {
    const { account, password, phone, email } = auth;

    const existAcc = await this.prisma.student.findUnique({ where: { account: String(account) } });

    if (existAcc) throw new ForbiddenException('Account is already exist');

    const newAccount = await this.prisma.student.create({
      data: {
        account,
        phone,
        email,
        password: utils.hash(password),
        role: ERole.STUDENT,
      },
    });

    return newAccount;
  }

  async signIn(auth: SignInDto, res: Response) {
    const { account, password } = auth;

    const acc = await this.prisma.student.findUnique({ where: { account: String(account) } });

    if (acc) {
      const isAuth = bcryptjs.compareSync(password, acc.password);
      if (isAuth) {
        const info: Student = { ...acc };

        delete info.password;
        delete info.createdAt;
        delete info.updatedAt;

        const payload: TokenPayload = {
          id: acc.id,
          account: acc.account,
          role: acc.role,
        };

        const accessToken = await this.getAccessToken(payload);

        const refreshToken = await this.getRefreshToken(payload);

        await this.prisma.auth.create({ data: { token: refreshToken } });

        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        return {
          accessToken,
          expiredIn: 900000,
          info,
          isAuth: true,
        };
      } else throw new UnauthorizedException('Password is not correct');
    } else throw new UnauthorizedException('Account is not correct');
  }

  async refreshToken(req: Request) {
    const cookies = req.cookies;

    try {
      const refreshToken = cookies['refreshToken'];

      if (!refreshToken) throw new ForbiddenException('Token is required');

      const token = await this.prisma.auth.findFirst({ where: { token: refreshToken } });

      if (!token) throw new HttpException('Token not match', HttpStatus.NOT_FOUND);
      else {
        const isAuth = this.jwt.verify(refreshToken, {
          secret: this.config.get('REFRESH_TOKEN_SECRET'),
        });

        if (isAuth) {
          const payload: TokenPayload = {
            id: isAuth.id,
            account: isAuth.account,
            role: isAuth.role,
          };

          const accessToken = await this.getAccessToken(payload);

          return {
            accessToken,
            expiredIn: 900000,
          };
        }
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) throw new ForbiddenException('Token is expired');
    }
  }

  async logout(req: Request) {
    const cookies = req.cookies;

    const refreshToken = cookies['refreshToken'];

    const token = await this.prisma.auth.findFirst({ where: { token: refreshToken } });

    if (token) await this.prisma.auth.delete({ where: { id: token.id } });

    throw new HttpException('Logout success', HttpStatus.OK);
  }
}
