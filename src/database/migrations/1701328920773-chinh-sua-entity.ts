import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChinhSuaEntity1701328920773 implements MigrationInterface {
  name = 'ChinhSuaEntity1701328920773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vinh_xe_bus\` ADD \`diem_dung_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`he_noi_bo\` ADD \`diem_dung_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`hang_rao\` ADD \`diem_dung_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duong_noi_bo\` ADD \`diem_dung_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cay_xanh\` ADD \`diem_dung_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_vach_son\` ADD UNIQUE INDEX \`IDX_5c133e213edf17881d1ef907d2\` (\`name\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vinh_xe_bus\` ADD CONSTRAINT \`FK_d1b09246a2e737b4092a7496a58\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`he_noi_bo\` ADD CONSTRAINT \`FK_2e26f29592804e511ff94fac07c\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`hang_rao\` ADD CONSTRAINT \`FK_14592d325a73fbe4726902f7ade\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`duong_noi_bo\` ADD CONSTRAINT \`FK_69d6d757fc9d7a0d9fbbc241d04\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cay_xanh\` ADD CONSTRAINT \`FK_660608c684c962de6d3bcee0230\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cay_xanh\` DROP FOREIGN KEY \`FK_660608c684c962de6d3bcee0230\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duong_noi_bo\` DROP FOREIGN KEY \`FK_69d6d757fc9d7a0d9fbbc241d04\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`hang_rao\` DROP FOREIGN KEY \`FK_14592d325a73fbe4726902f7ade\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`he_noi_bo\` DROP FOREIGN KEY \`FK_2e26f29592804e511ff94fac07c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vinh_xe_bus\` DROP FOREIGN KEY \`FK_d1b09246a2e737b4092a7496a58\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`loai_vach_son\` DROP INDEX \`IDX_5c133e213edf17881d1ef907d2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cay_xanh\` DROP COLUMN \`diem_dung_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`duong_noi_bo\` DROP COLUMN \`diem_dung_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`hang_rao\` DROP COLUMN \`diem_dung_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`he_noi_bo\` DROP COLUMN \`diem_dung_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vinh_xe_bus\` DROP COLUMN \`diem_dung_id\``,
    );
  }
}
