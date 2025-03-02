import { Migration } from '@mikro-orm/migrations';

export class Migration20250302051502 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user_availability" drop constraint "user_availability_user_id_foreign";`);

    this.addSql(`alter table "user_skills" drop constraint "user_skills_user_id_foreign";`);

    this.addSql(`alter table "user" alter column "id" drop default;`);
    this.addSql(`alter table "user" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "user" alter column "id" drop default;`);

    this.addSql(`alter table "user_availability" alter column "user_id" drop default;`);
    this.addSql(`alter table "user_availability" alter column "user_id" type uuid using ("user_id"::text::uuid);`);
    this.addSql(`alter table "user_availability" add constraint "user_availability_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "user_skills" alter column "user_id" drop default;`);
    this.addSql(`alter table "user_skills" alter column "user_id" type uuid using ("user_id"::text::uuid);`);
    this.addSql(`alter table "user_skills" add constraint "user_skills_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "user_availability" alter column "user_id" type text using ("user_id"::text);`);

    this.addSql(`alter table "user_availability" drop constraint "user_availability_user_id_foreign";`);

    this.addSql(`alter table "user_skills" alter column "user_id" type text using ("user_id"::text);`);

    this.addSql(`alter table "user_skills" drop constraint "user_skills_user_id_foreign";`);

    this.addSql(`alter table "user" alter column "id" type int4 using ("id"::int4);`);
    this.addSql(`create sequence if not exists "user_id_seq";`);
    this.addSql(`select setval('user_id_seq', (select max("id") from "user"));`);
    this.addSql(`alter table "user" alter column "id" set default nextval('user_id_seq');`);

    this.addSql(`alter table "user_availability" alter column "user_id" type int4 using ("user_id"::int4);`);
    this.addSql(`alter table "user_availability" add constraint "user_availability_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "user_skills" alter column "user_id" type int4 using ("user_id"::int4);`);
    this.addSql(`alter table "user_skills" add constraint "user_skills_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`);
  }

}
