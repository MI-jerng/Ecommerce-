import { ObjectType , Field, ID, Float } from "@nestjs/graphql";
import { CategoryType } from "./category.type";
import { fail } from "assert";

@ObjectType()
export class ProductType {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field(() => Float)
    price: number;

    @Field(() => ID)
    categoryId: number;

    @Field(() => CategoryType, { nullable: true })
    category?: CategoryType;
}