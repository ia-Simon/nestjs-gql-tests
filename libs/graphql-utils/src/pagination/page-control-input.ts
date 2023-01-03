import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class PageControlInput {
    @Field(type => Int)
    page: number = 1;

    @Field(type => Int)
    size: number = 20;
}