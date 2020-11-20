import { getRepository, Repository } from 'typeorm';
import ICreateProductDTO from '../dtos/Products/ICreateProductDTO';
import Product from '../entities/Product';
import IProductsRepository from '../repositoriesInterface/IProductsRepository';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    barcode,
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.ormRepository.create({
      barcode,
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }
}

export default ProductsRepository;
