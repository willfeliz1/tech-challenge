import { inject, injectable } from 'tsyringe';
import Stocks from '../../entities/Stocks';
import AppError from '../../errors/AppError';
import IProductsRepository from '../../repositoriesInterface/IProductsRepository';
import IStocksRepository from '../../repositoriesInterface/IStocksRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  name: string;
  products: IProduct[];
}

@injectable()
class CreateStocksService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
  ) {}

  public async execute({ name, products }: IRequest): Promise<Stocks> {
    const existentProducts = await this.productsRepository.findAllById(
      products,
    );

    if (!existentProducts.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existentProductsIds = existentProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existentProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id} `,
      );
    }

    const findProductsWithNoQtdAvailable = products.filter(
      product =>
        existentProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (findProductsWithNoQtdAvailable.length) {
      throw new AppError(
        `Could not find product ${findProductsWithNoQtdAvailable[0].quantity} is not available for ${findProductsWithNoQtdAvailable[0].id} `,
      );
    }

    const addProductQuantity = products.map(product => ({
      id: product.id,
      quantity:
        existentProducts.filter(p => p.id === product.id)[0].quantity +
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(addProductQuantity);

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
    }));

    const stock = await this.stocksRepository.create({
      name,
      products: serializedProducts,
    });

    return stock;
  }
}

export default CreateStocksService;
