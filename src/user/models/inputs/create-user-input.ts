import { InputType, OmitType } from "@nestjs/graphql";
import { User } from "../user";

@InputType()
export class CreateUserInput extends OmitType(User, ['id'], InputType) {}
