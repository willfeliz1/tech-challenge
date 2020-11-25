import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';
import IProductsRepository from '../../repositoriesInterface/IProductsRepository';
import IStocksRepository from '../../repositoriesInterface/IStocksRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  id: string;
  name: string;
  products: IProduct[];
}

@injectable()
class UpdateStocksService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StocksRepository')
    private stocksRepository: IStocksRepository,
  ) {}

  public async execute({ id, name, products }: IRequest): Promise<Stocks> {
    const stock = await this.stocksRepository.findById(id);

    if (!stock) {
      throw new AppError('Stock not found.', 404);
    }

    const existentProducts = await this.productsRepository.findAllById(
      products,
    );

    const newStockProduct = stock.stockproducts.map(stockprod => {
      const newQuantity = products.filter(
        prod => prod.id === stockprod.product_id,
      )[0].quantity;

      switch (newQuantity !== stockprod.quantity) {
        case newQuantity > stockprod.quantity:
          return {
            id: stockprod.stock_id,
            product_id: stockprod.product_id,
            stockQuantity: stockprod.quantity + newQuantity,
            quantity:
              existentProducts.filter(p => p.id === stockprod.product_id)[0]
                .quantity + newQuantity,
          };

        case newQuantity < stockprod.quantity:
          return {
            id: stockprod.stock_id,
            product_id: stockprod.product_id,
            stockQuantity: stockprod.quantity - newQuantity,
            quantity:
              existentProducts.filter(p => p.id === stockprod.product_id)[0]
                .quantity - newQuantity,
          };

        default:
          return {
            id: stockprod.stock_id,
            product_id: stockprod.product_id,
            quantity: stockprod.quantity,
          };
      }
    });

    const updatedProductQuantity = products.map(product => ({
      id: product.id,
      quantity: newStockProduct.filter(
        stockproduct => stockproduct.product_id === product.id,
      )[0].quantity,
    }));

    await this.productsRepository.updateQuantity(updatedProductQuantity);
  }
}

export default UpdateStocksService;
