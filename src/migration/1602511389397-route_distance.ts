import {MigrationInterface, QueryRunner} from "typeorm";

export class routeDistance1602511389397 implements MigrationInterface {
    name = 'routeDistance1602511389397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" ADD "distance" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "distance"`);
    }

}
