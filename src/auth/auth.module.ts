import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';

@Module({
  providers: [AuthService],
  imports: [UsersModule],
})
export class AuthModule {}
