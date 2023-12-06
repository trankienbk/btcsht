import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiHeThongChieuSang1701404575746
  implements MigrationInterface
{
  name = 'ThemMoiHeThongChieuSang1701404575746';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`he_thong_chieu_sang\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` text NULL, \`diem_dung_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`he_thong_chieu_sang\` ADD CONSTRAINT \`FK_102b947345d92c9df8e52ebec8a\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`he_thong_chieu_sang\` DROP FOREIGN KEY \`FK_102b947345d92c9df8e52ebec8a\``,
    );
    await queryRunner.query(`DROP TABLE \`he_thong_chieu_sang\``);
  }
}
