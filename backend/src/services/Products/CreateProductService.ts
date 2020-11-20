import { inject, injectable } from 'tsyringe';
import Product from '../../entities/Product';
import IProductsRepository from '../../repositoriesInterface/IProductsRepository';

interface IRequest {
  barcode: string;
  name: string;
  quantity: number;
  price: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    barcode,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      barcode,
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
