import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ShareSecretGuard } from 'src/common/guards/guards/share-secret.guard';
import { ShowUserDto } from '../dtos/response/show-user.dto';
import { UsersService } from '../services/users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  @Query(() => ShowUserDto, { nullable: true })
  @UseGuards(ShareSecretGuard)
  async myProfile() {
    return null;
  }

  @Query(() => [ShowUserDto])
  async findAll() {
    const allUser = await this.usersService.findAll();
    return allUser;
  }
}
