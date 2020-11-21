import ICreateProductDTO from '../dtos/Products/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '../dtos/Products/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}
export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findAllById(products: IFindProducts[]): Promise<Product[]>;
  updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]>;
}
