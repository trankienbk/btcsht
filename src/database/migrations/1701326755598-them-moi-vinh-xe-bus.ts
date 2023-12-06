import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiVinhXeBus1701326755598 implements MigrationInterface {
  name = 'ThemMoiVinhXeBus1701326755598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vinh_xe_bus\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`don_vi_id\` int NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_7b34c5836d5be135ece09aec8f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_7b34c5836d5be135ece09aec8f\` ON \`vinh_xe_bus\``,
    );
    await queryRunner.query(`DROP TABLE \`vinh_xe_bus\``);
  }
}
