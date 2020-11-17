import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addProductsIDToStocksProducts1605647436900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'stocks_products',
        new TableColumn({
          name: 'product_id',
          type: 'uuid',
          isNullable: true,
        }),
      );
  
      await queryRunner.createForeignKey(
        'stocks_products',
        new TableForeignKey({
          name: 'StocksProductsProduct',
          columnNames: ['product_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'products',
          onDelete: 'SET NULL',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('stocks_products', 'StocksProductsProduct');

      await queryRunner.dropColumn('StocksProductsProduct', 'stock_id');
    
    }

}
