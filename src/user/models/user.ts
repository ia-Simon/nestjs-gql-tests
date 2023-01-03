import { UserEntity } from "@app/mock-db";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field()
  email: string;
  
  @Field({ nullable: true})
  name?: string;

  static from_db(data: UserEntity): User {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
    };
  }
}
