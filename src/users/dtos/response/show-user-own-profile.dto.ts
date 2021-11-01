import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowUserOwnProfileDto {
  @Field(() => Int)
  readonly phone: number;

  @Field(() => Int)
  readonly countryCode: number;

  @Field()
  readonly point: number;
}
