import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowUserDto {
  @Field(() => Int)
  readonly phone: number;

  @Field(() => Int)
  readonly countryCode: number;
}
