import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Product from './Product';
import Stocks from './Stocks';

@Entity('stocks_products')
class StocksProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Stocks, stock => stock.stockproducts)
  @JoinColumn({ name: 'stock_id' })
  stocks: Stocks;

  @ManyToOne(() => Product, product => product.stockproducts)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: string;

  @Column()
  stock_id: string;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StocksProducts;
