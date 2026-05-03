import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {}

    @Query(() => [Category])
    categories(){
        return this.categoryService.findAll();
    }

    @Mutation(() => Boolean)
    removeCategory(@Args('id') id: number) {
        return this.categoryService.remove(id).then(() => true);
    }

    @Mutation(() => Category)
    createCategory(@Args('name') name: string) {
        return this.categoryService.create({ name });
    }
}
