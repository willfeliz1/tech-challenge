import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import StocksProducts from "./StocksProducts";

class Stocks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => StocksProducts, stockproducts => stockproducts.stocks)
  stockproducts: StocksProducts[];

  @Column()
  name: string;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Stocks;