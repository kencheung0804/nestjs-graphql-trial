import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowUserSecretDto {
  @Field(() => Int)
  readonly phone: number;

  @Field(() => Int)
  readonly countryCode: number;

  @Field()
  readonly shareSecret: string;
}
