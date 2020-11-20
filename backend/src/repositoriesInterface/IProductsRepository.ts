import ICreateProductDTO from '../dtos/Products/ICreateProductDTO';
import Product from '../entities/Product';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
}
