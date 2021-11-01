import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from '../../users/services/auth.service';

import { UseGuards } from '@nestjs/common';
import { ShareSecretGuard } from '../../common/guards/guards/share-secret.guard';
import { SignupInputDto } from '../dtos/args/signup-input.dto';
import { ShowUserDto } from '../../users/dtos/response/show-user.dto';
import { ShowUserSecretDto } from '../dtos/response/show-user-secret.dto';
import { VerifyOtpInputDto } from '../dtos/args/verify-otp-input.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => Boolean)
  resendOtp(@Args('input') input: SignupInputDto) {
    return this.authService.resendOtp(input.countryCode, input.phone);
  }

  @Mutation(() => ShowUserDto)
  signup(@Args('input') input: SignupInputDto) {
    return this.authService.signup(input.countryCode, input.phone);
  }

  @Mutation(() => ShowUserSecretDto)
  @UseGuards(ShareSecretGuard)
  verify(@Args('input') input: VerifyOtpInputDto) {
    return this.authService.verify(input.otp, input.countryCode, input.phone);
  }
}
