import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewGenerate202328111701159966472 implements MigrationInterface {
  name = 'NewGenerate202328111701159966472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vi_tri\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`is_display\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_diem_dung\` DROP COLUMN \`tinh_trang_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` DROP COLUMN \`tinh_trang_id\``,
    );
    await queryRunner.query(`ALTER TABLE \`diem_dung\` DROP COLUMN \`code\``);
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD \`code\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`diem_dung\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD \`name\` varchar(50) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`diem_dung\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`diem_dung\` DROP COLUMN \`code\``);
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD \`code\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD \`tinh_trang_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duy_tu_diem_dung\` ADD \`tinh_trang_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`vi_tri\``);
  }
}
