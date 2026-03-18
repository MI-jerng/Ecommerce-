import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  receiptId: string;

  @Column({ type: 'timestamptz' })
  issuedAt: Date;

  @Column()
  name: string;

  @Column('float')
  price: number;
}
