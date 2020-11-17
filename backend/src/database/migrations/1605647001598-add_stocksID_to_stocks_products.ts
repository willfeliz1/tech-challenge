import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addStocksIDToStocksProducts1605647001598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'stocks_products',
        new TableColumn({
          name: 'stock_id',
          type: 'uuid',
          isNullable: true,
        }),
      );
      
      await queryRunner.createForeignKey(
        'stocks_products',
        new TableForeignKey({
          name: 'StocksProductsStock',
          columnNames: ['stock_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'stocks',
          onDelete: 'SET NULL',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('stocks_products', 'StocksProductsStock');

      await queryRunner.dropColumn('StocksProductStock', 'stock_id');
    }

}
