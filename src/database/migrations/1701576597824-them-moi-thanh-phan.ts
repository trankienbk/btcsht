import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiThanhPhan1701576597824 implements MigrationInterface {
  name = 'ThemMoiThanhPhan1701576597824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` CHANGE \`thanh_phan\` \`thanh_phan_id\` text NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`thanh_phan\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` DROP COLUMN \`thanh_phan_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` ADD \`thanh_phan_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` ADD CONSTRAINT \`FK_1d44357e49bc9de508373c12ddc\` FOREIGN KEY (\`thanh_phan_id\`) REFERENCES \`thanh_phan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` DROP FOREIGN KEY \`FK_1d44357e49bc9de508373c12ddc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` DROP COLUMN \`thanh_phan_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` ADD \`thanh_phan_id\` text NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`thanh_phan\``);
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_vach_son\` CHANGE \`thanh_phan_id\` \`thanh_phan\` text NOT NULL`,
    );
  }
}
