import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field(() => ID)
  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  @Field(() => Category, { nullable: true })
  category: Category;
}
