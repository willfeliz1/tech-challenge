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

  @OneToMany(() => StocksProducts, stock_products => stock_products.stocks, {
    cascade: true,
  })
  stockproducts: StocksProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Stocks;
