import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInputDto } from './dto/args/signup-input.dto';
import { ShowUserDto } from './dto/show-user.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Query(() => [ShowUserDto])
  async findAll() {
    const allUser = await this.usersService.findAll();
    return allUser;
  }

  @Mutation(() => ShowUserDto)
  signup(@Args('input') input: SignupInputDto) {
    return this.authService.signup(
      input.countryCode,
      input.phone,
      input.password,
    );
  }
}
