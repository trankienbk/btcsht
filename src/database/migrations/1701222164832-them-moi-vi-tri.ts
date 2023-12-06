import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiViTri1701222164832 implements MigrationInterface {
  name = 'ThemMoiViTri1701222164832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` CHANGE \`vi_tri\` \`vi_tri_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` DROP COLUMN \`vi_tri_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD \`vi_tri_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD CONSTRAINT \`FK_d607b07c1982b088705eea97fa9\` FOREIGN KEY (\`vi_tri_id\`) REFERENCES \`vi_tri\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` DROP FOREIGN KEY \`FK_d607b07c1982b088705eea97fa9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` DROP COLUMN \`vi_tri_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD \`vi_tri_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` CHANGE \`vi_tri_id\` \`vi_tri\` varchar(255) NULL`,
    );
  }
}
