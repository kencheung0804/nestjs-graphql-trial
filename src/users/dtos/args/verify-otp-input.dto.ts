import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';

@InputType()
export class VerifyOtpInputDto {
  @Field(() => Int)
  readonly phone: number;

  @Field(() => Int)
  readonly countryCode: number;

  @Transform(({ value }) => value.toString())
  @Field()
  readonly otp: string;
}
