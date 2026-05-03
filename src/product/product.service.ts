import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(data: Partial<Product>) {
    const product = this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    return this.productRepo.findOne({ where: { id } });
  }

  findByCategory(categoryId: number) {
    return this.productRepo.find({ where: { categoryId } });
  }
}
