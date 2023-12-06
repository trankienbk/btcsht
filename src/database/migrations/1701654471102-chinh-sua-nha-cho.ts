import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChinhSuaNhaCho1701654471102 implements MigrationInterface {
  name = 'ChinhSuaNhaCho1701654471102';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` CHANGE \`image\` \`id_file\` longtext COLLATE "utf8mb4_bin" NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`nha_cho\` DROP COLUMN \`id_file\``);
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD \`id_file\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`nha_cho\` DROP COLUMN \`id_file\``);
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` ADD \`id_file\` longtext COLLATE "utf8mb4_bin" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_cho\` CHANGE \`id_file\` \`image\` longtext COLLATE "utf8mb4_bin" NULL`,
    );
  }
}
