import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import StocksProducts from './StocksProducts';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @OneToMany(() => StocksProducts, stockproducts => stockproducts.product)
  stockproducts: StocksProducts[];

  @Column()
  barcode: string;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;