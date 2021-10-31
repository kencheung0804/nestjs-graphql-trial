import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SignupInputDto {
  @Field(() => Int)
  readonly phone: number;

  @Field(() => Int)
  readonly countryCode: number;

  @Field()
  readonly password: string;
}
