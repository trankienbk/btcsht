import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiHeNoiBo1701317933610 implements MigrationInterface {
  name = 'ThemMoiHeNoiBo1701317933610';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`he_noi_bo\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`don_vi_id\` int NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_5b6c35c40259c9c933a769f261\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_5b6c35c40259c9c933a769f261\` ON \`he_noi_bo\``,
    );
    await queryRunner.query(`DROP TABLE \`he_noi_bo\``);
  }
}
