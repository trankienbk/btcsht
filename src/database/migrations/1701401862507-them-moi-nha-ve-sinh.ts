import { MigrationInterface, QueryRunner } from 'typeorm';

export class ThemMoiNhaVeSinh1701401862507 implements MigrationInterface {
  name = 'ThemMoiNhaVeSinh1701401862507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`nha_ve_sinh\` (\`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`description\` text NULL, \`diem_dung_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`nha_ve_sinh\` ADD CONSTRAINT \`FK_9f00c49214de54d467f2c97a864\` FOREIGN KEY (\`diem_dung_id\`) REFERENCES \`diem_dung\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`nha_ve_sinh\` DROP FOREIGN KEY \`FK_9f00c49214de54d467f2c97a864\``,
    );
    await queryRunner.query(`DROP TABLE \`nha_ve_sinh\``);
  }
}
