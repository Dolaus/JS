import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExhibition1732822860203 implements MigrationInterface {
    name = 'AddExhibition1732822860203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exhibitions" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_0f4f908f4d38be7ab76b32aead7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exhibitions" ADD CONSTRAINT "FK_7e5e104ec85b3b7fd80785365b9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibitions" DROP CONSTRAINT "FK_7e5e104ec85b3b7fd80785365b9"`);
        await queryRunner.query(`DROP TABLE "exhibitions"`);
    }

}
