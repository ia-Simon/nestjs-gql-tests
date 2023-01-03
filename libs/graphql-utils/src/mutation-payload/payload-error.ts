import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PayloadError {
  @Field()
  code: string;
  
  @Field()
  message: string;
}