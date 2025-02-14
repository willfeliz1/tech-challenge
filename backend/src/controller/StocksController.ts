import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateStocksService from '../services/Stocks/CreateStocksService';
import FindAllStocksService from '../services/Stocks/FindAllStocksService';

export default class StocksController {
  // listar, criar, atualizar, deletar

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllStocks = container.resolve(FindAllStocksService);

    const stocks = await findAllStocks.execute();

    return response.json(stocks);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, products } = request.body;

    const createStock = container.resolve(CreateStocksService);

    const stock = await createStock.execute({
      name,
      products,
    });

    return response.json(stock);
  }

  // public async update(request: Request, response: Response): Promise<void> {
  //   // TODO
  // }

  // public async delete(request: Request, response: Response): Promise<void> {
  //   // TODO
  // }
}
