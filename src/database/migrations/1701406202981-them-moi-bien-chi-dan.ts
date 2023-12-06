import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiBienChiDan1701406202981 implements MigrationInterface {
  name = 'ThemMoiBienChiDan1701406202981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bien_chi_dan\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` text NULL, \`diem_dung_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bien_chi_dan\` ADD CONSTRAINT \`FK_880d6e58618f68f7b8c2d6a687a\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bien_chi_dan\` DROP FOREIGN KEY \`FK_880d6e58618f68f7b8c2d6a687a\``,
    );
    await queryRunner.query(`DROP TABLE \`bien_chi_dan\``);
  }
}
