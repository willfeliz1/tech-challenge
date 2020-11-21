import ICreateStocksDTO from '../dtos/Stocks/ICreateStocksDTO';
import Stocks from '../entities/Stocks';

export default interface IStocksRepository {
  create(data: ICreateStocksDTO): Promise<Stocks>;
  findAll(): Promise<Stocks[] | undefined>;
}
