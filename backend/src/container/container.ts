import { container } from 'tsyringe';
import ProductsRepository from '../repositories/ProductsRepository';
import IProductsRepository from '../repositoriesInterface/IProductsRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
