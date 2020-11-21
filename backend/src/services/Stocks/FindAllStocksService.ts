import { inject, injectable } from 'tsyringe';
import Stocks from '../../entities/Stocks';
import IStocksRepository from '../../repositoriesInterface/IStocksRepository';

@injectable()
class FindAllStocksService {
  constructor(
    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
  ) {}

  public async execute(): Promise<Stocks[] | undefined> {
    const stocks = await this.stocksRepository.findAll();

    return stocks;
  }
}

export default FindAllStocksService;
