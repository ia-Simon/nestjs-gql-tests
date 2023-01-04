import { MutationPayloadType } from "@app/graphql-utils";
import { ObjectType } from "@nestjs/graphql";
import { User } from "./user";

@ObjectType()
export class UserPayload extends MutationPayloadType(User) {}