import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../services/Products/CreateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { barcode, name, quantity, price } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      barcode,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }
}
