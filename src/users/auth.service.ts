import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(countryCode: number, phone: number, password: string) {
    const existingUser = await this.usersService.findOne(countryCode, phone);

    if (!!existingUser) {
      throw new BadRequestException('phone no. in use');
    }
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(countryCode, phone, result);

    return user;
  }
}
