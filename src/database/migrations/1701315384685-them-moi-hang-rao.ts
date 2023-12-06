import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiHangRao1701315384685 implements MigrationInterface {
  name = 'ThemMoiHangRao1701315384685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`hang_rao\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`don_vi_id\` int NOT NULL, \`description\` text NULL, UNIQUE INDEX \`IDX_a3c2459c6436052e5a82f9e150\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_a3c2459c6436052e5a82f9e150\` ON \`hang_rao\``,
    );
    await queryRunner.query(`DROP TABLE \`hang_rao\``);
  }
}
