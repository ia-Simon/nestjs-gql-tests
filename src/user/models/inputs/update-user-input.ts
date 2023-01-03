import { InputType, OmitType, PartialType } from "@nestjs/graphql";
import { User } from "../user";

@InputType()
export class UpdateUserInput extends PartialType(OmitType(User, ['id']), InputType) {}
