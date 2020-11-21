import { Router } from 'express';
import StocksController from '../controller/StocksController';

const stocksRouter = Router();
const stocksController = new StocksController();

stocksRouter.post('/', stocksController.create);
stocksRouter.get('/', stocksController.findAll);

export default stocksRouter;
