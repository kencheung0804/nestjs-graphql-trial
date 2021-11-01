import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as speakeasy from 'speakeasy';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(countryCode: number, phone: number) {
    const existingUser = await this.usersService.findOne(countryCode, phone);

    if (!!existingUser) {
      throw new BadRequestException('phone no. in use');
    }

    const { base32: tempSecret } = speakeasy.generateSecret();

    const user = await this.usersService.create(countryCode, phone, tempSecret);

    const otp = speakeasy.totp({
      secret: tempSecret,
      encoding: 'base32',
    });

    // TODO: send otp via sms to client
    console.log(otp);

    return user;
  }

  async resendOtp(countryCode: number, phone: number) {
    const existingUser = await this.usersService.findOne(countryCode, phone);

    if (!existingUser) {
      throw new BadRequestException('phone no. has not been signed up');
    }

    const otp = speakeasy.totp({
      secret: existingUser.otpSecret,
      encoding: 'base32',
    });

    // TODO: send otp via sms to client
    console.log(otp);

    return true;
  }

  async verify(otp: string, countryCode: number, phone: number) {
    const existingUser = await this.usersService.findOne(countryCode, phone);

    if (!existingUser) {
      throw new BadRequestException('phone no. has not been signed up');
    }

    const otpSecret = existingUser.otpSecret;

    const verified = speakeasy.totp.verify({
      secret: otpSecret,
      encoding: 'base32',
      token: otp,
      window: 1,
    });

    if (!verified) {
      throw new UnauthorizedException(
        'One-time password has expired/ is not valid!',
      );
    }

    const shareSecret = speakeasy.generateSecret().base32;

    return this.usersService.update(existingUser.id, {
      shareSecret,
    });
  }
}
