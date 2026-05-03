import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductType } from '../types/product.type';
import { CreateProductInput } from '../inputs/create-product.input';
import { ProductService } from '../../product/product.service';
import { CategoryService } from '../../category/category.service';
import { CategoryType } from '../types/category.type';

@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
    constructor(
        private readonly productService: ProductService,
        private readonly categoryService: CategoryService
    ) {}

    @Query(() => [ProductType])
    products(){
        return this.productService.findAll();
    }

    @Query(() => ProductType, { nullable: true })
    product(@Args('id') id: string){
        return this.productService.findOne(Number(id));
    }
}