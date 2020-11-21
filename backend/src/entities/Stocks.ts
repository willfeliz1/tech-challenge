import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import StocksProducts from './StocksProducts';

@Entity('stocks')
class Stocks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => StocksProducts, stock_products => stock_products.stocks, {
    cascade: true,
    eager: true,
  })
  stockproducts: StocksProducts[];
}

export default Stocks;
