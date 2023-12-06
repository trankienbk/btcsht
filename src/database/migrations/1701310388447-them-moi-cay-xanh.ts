import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiCayXanh1701310388447 implements MigrationInterface {
  name = 'ThemMoiCayXanh1701310388447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cay_xanh\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`don_vi_id\` int NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_9e1c8af577c7220502cba12e1d\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_9e1c8af577c7220502cba12e1d\` ON \`cay_xanh\``,
    );
    await queryRunner.query(`DROP TABLE \`cay_xanh\``);
  }
}
