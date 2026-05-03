import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from '../../product/product.service';
import { CategoryService } from '../../category/category.service';
import { Product } from '../../product/product.entity';
import { Category } from '../../category/category.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [Product])
  products() {
    return this.productService.findAll();
  }

  @Query(() => [Product])
  productsByCategory(@Args('categoryId') categoryId: string) {
    return this.productService.findByCategory(Number(categoryId));
  }

  @Query(() => Product, { nullable: true })
  product(@Args('id') id: string) {
    // GraphQL ID comes as string; convert if needed
    return this.productService.findOne(Number(id));
  }

  @Mutation(() => Product)
  createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId') categoryId: string,
  ) {
    return this.productService.create({
      name,
      price,
      categoryId: Number(categoryId),
    });
  }

  // ✅ relation: Product.category
  @ResolveField(() => Category, { nullable: true })
  category(@Parent() product: any) {
    return this.categoryService.findOne(product.categoryId);
  }
}