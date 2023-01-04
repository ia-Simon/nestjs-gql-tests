import { PaginateType } from "@app/graphql-utils";
import { ObjectType } from "@nestjs/graphql";
import { User } from "./user";

@ObjectType()
export class UserPagination extends PaginateType(User) {}