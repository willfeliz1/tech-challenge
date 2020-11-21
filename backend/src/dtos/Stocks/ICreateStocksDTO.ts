interface IProduct {
  product_id: string;
  quantity: number;
}

export default interface ICreateStocksDTO {
  name: string;
  products: IProduct[];
}
