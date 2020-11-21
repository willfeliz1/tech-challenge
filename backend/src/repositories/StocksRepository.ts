import { getRepository, Repository } from 'typeorm';
import ICreateStocksDTO from '../dtos/Stocks/ICreateStocksDTO';
import Stocks from '../entities/Stocks';
import IStocksRepository from '../repositoriesInterface/IStocksRepository';

class StocksRepository implements IStocksRepository {
  private ormRepository: Repository<Stocks>;

  constructor() {
    this.ormRepository = getRepository(Stocks);
  }

  public async create({ name, products }: ICreateStocksDTO): Promise<Stocks> {
    const stock = this.ormRepository.create({
      name,
      stockproducts: products,
    });

    await this.ormRepository.save(stock);

    return stock;
  }
}

export default StocksRepository;
