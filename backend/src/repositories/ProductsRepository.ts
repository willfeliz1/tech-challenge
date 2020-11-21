import { getRepository, In, Repository } from 'typeorm';
import ICreateProductDTO from '../dtos/Products/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '../dtos/Products/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';
import IProductsRepository from '../repositoriesInterface/IProductsRepository';

interface IFindProducts {
  id: string;
}
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

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    return this.ormRepository.save(products);
  }
}

export default ProductsRepository;
