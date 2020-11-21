import { container } from 'tsyringe';
import ProductsRepository from '../repositories/ProductsRepository';
import StocksRepository from '../repositories/StocksRepository';
import IProductsRepository from '../repositoriesInterface/IProductsRepository';
import IStocksRepository from '../repositoriesInterface/IStocksRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IStocksRepository>(
  'StocksRepository',
  StocksRepository,
);
