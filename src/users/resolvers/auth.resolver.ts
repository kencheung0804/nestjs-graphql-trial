import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { SignupInputDto } from '../dtos/args/signup-input.dto';
import { ShowUserDto } from '../dtos/response/show-user.dto';
import { VerifyOtpInputDto } from '../dtos/args/verify-otp-input.dto';
import { ShowUserSecretDto } from '../dtos/response/show-user-secret.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  verify(@Args('input') input: VerifyOtpInputDto) {
    return this.authService.verify(input.otp, input.countryCode, input.phone);
  }
}
