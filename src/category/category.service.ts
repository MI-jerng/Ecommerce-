import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  create(data: Partial<Category>) {
    const category = this.categoryRepo.create(data);
    return this.categoryRepo.save(category);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    return this.categoryRepo.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
