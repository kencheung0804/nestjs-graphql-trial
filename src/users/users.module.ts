import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { User } from './model/user.entity';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';
import { AuthResolver } from '../auth/resolvers/auth.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService, AuthService, AuthResolver],
  exports: [UsersService],
})
export class UsersModule {}
