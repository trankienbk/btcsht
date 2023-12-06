import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiNhaDieuHanh1701414329688 implements MigrationInterface {
  name = 'ThemMoiNhaDieuHanh1701414329688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`nha_dieu_hanh\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`mong\` varchar(255) NOT NULL, \`nen\` varchar(255) NOT NULL, \`mai\` varchar(255) NOT NULL, \`thiet_bi\` varchar(255) NOT NULL, \`description\` text NULL, \`diem_dung_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_dieu_hanh\` ADD CONSTRAINT \`FK_bab6e72da4fb635123c791eb452\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`nha_dieu_hanh\` DROP FOREIGN KEY \`FK_bab6e72da4fb635123c791eb452\``,
    );
    await queryRunner.query(`DROP TABLE \`nha_dieu_hanh\``);
  }
}
