import { UserEntity } from "@app/mock-db";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  constructor(data: UserEntity) {
    Object.assign(this, data);
  }

  @Field(type => ID)
  id: number;

  @Field()
  email: string;
  
  @Field({ nullable: true})
  name?: string;
}
