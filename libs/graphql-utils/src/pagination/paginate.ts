import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PageControlInput } from "./page-control-input";


export function Paginate<T>(ResourceType: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class Paginate {
    @Field(type => Int)
    page: number;

    @Field(type => Int)
    size: number;

    @Field(type => Int)
    total: number;
  
    @Field(type => [ResourceType])
    items: T[];

    setItems(items: T[]) {
      this.items = items;
    }

    setMetrics(pageControl: PageControlInput, total: number) {
      this.page = pageControl.page;
      this.size = pageControl.size;
      this.total = total;
    }
  }

  return Paginate;
}
