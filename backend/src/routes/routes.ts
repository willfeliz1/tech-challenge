import { Router } from 'express';
import productsRouter from './products.routes';
import stocksRouter from './stocks.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/stocks', stocksRouter);

export default routes;
