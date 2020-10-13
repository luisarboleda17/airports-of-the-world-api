import {MigrationInterface, QueryRunner} from "typeorm";

export class routeDistanceNotNullable1602513338629 implements MigrationInterface {
    name = 'routeDistanceNotNullable1602513338629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_b8c6fb688527064c0f9d532d889"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c"`);
        await queryRunner.query(`ALTER TABLE "route" ALTER COLUMN "originIata" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" ALTER COLUMN "destinationIata" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_b8c6fb688527064c0f9d532d889" FOREIGN KEY ("originIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c" FOREIGN KEY ("destinationIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_b8c6fb688527064c0f9d532d889"`);
        await queryRunner.query(`ALTER TABLE "route" ALTER COLUMN "destinationIata" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" ALTER COLUMN "originIata" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_eeeb7d5d96b3f549b96fa4b156c" FOREIGN KEY ("destinationIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_b8c6fb688527064c0f9d532d889" FOREIGN KEY ("originIata") REFERENCES "airport"("iata") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
