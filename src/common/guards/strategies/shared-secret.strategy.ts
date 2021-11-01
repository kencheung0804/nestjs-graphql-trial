import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-header-strategy';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class ShareSecretStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(request: Request, token: string): Promise<any> {
    console.log('Custom validation', request);
    console.log(token);

    return true;
  }
}
