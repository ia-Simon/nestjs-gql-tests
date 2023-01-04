import { Type } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { PayloadError } from "./payload-error";


export function MutationPayloadType<T>(ResourceType: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class MutationPayloadType {
    @Field()
    status: boolean;
  
    @Field(type => [PayloadError], { nullable: true })
    errors: PayloadError[];
  
    @Field(type => ResourceType, { nullable: true })
    resource?: T;

    addError(error: PayloadError) {
      this.status = false;
      !this.errors ? this.errors = [error] : this.errors.push(error);
    }

    setResource(resource: T) {
      this.status = true;
      this.resource = resource;
    }
  }

  return MutationPayloadType;
}
