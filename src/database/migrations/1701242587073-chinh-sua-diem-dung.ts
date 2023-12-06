import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChinhSuaDiemDung1701242587073 implements MigrationInterface {
  name = 'ChinhSuaDiemDung1701242587073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` DROP FOREIGN KEY \`FK_d607b07c1982b088705eea97fa9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` CHANGE \`vi_tri_id\` \`diaChi\` int NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`diem_dung\` DROP COLUMN \`diaChi\``);
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD \`diaChi\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`loai_vach_son\` DROP INDEX \`IDX_5c133e213edf17881d1ef907d2\``,
    );
    await queryRunner.query(`ALTER TABLE \`diem_dung\` DROP COLUMN \`diaChi\``);
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` ADD \`diaChi\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`diem_dung\` CHANGE \`diaChi\` \`vi_tri_id\` int NULL`,
    );
  }
}
