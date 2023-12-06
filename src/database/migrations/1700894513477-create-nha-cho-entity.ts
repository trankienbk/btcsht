import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNhaChoEntity1700894513477 implements MigrationInterface {
  name = 'CreateNhaChoEntity1700894513477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`nha_cho\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`don_vi_id\` int NOT NULL, \`chieu_dai\` int NOT NULL, \`chieu_rong\` int NOT NULL, \`nam_dau_tu\` datetime NOT NULL, \`note\` text NULL, \`image\` json NULL, \`chieu_dai_mai\` int NOT NULL, \`chieu_rong_mai\` int NOT NULL, \`vat_lieu_mai\` varchar(255) NOT NULL, \`chieu_dai_cot\` int NOT NULL, \`duong_kinh_cot\` int NOT NULL, \`vat_lieu_cot\` varchar(255) NOT NULL, \`mau_sac_cot\` varchar(255) NULL, \`chieu_dai_khung\` int NOT NULL, \`chieu_rong_khung\` int NOT NULL, \`vat_lieu_khung\` varchar(255) NOT NULL, \`chieu_dai_ghe\` int NOT NULL, \`vat_lieu_ghe\` varchar(255) NOT NULL, \`chieu_dai_tam_mica\` int NOT NULL, \`chieu_rong_tam_mica\` int NOT NULL, \`description_tam_mica\` text NULL, \`description_mong\` text NULL, \`description_lung\` text NULL, \`description_hong\` text NULL, \`description_hoi\` text NULL, \`loai_nha_cho_id\` int NULL, \`tinh_trang_doi_tuong_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD CONSTRAINT \`FK_4a68621d5b58d22fd53690ed616\` FOREIGN KEY (\`loai_nha_cho_id\`) REFERENCES \`loai_nha_cho\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD CONSTRAINT \`FK_aabc797902418073ab9fc2c7a65\` FOREIGN KEY (\`tinh_trang_doi_tuong_id\`) REFERENCES \`tinh_trang\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP FOREIGN KEY \`FK_aabc797902418073ab9fc2c7a65\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` DROP FOREIGN KEY \`FK_4a68621d5b58d22fd53690ed616\``,
    );
    await queryRunner.query(`DROP TABLE \`nha_cho\``);
  }
}
