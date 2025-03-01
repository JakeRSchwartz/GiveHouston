import { Migration } from '@mikro-orm/migrations';

export class Migration20250301221259 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "address1" varchar(255) not null, "address2" varchar(255) null, "city" varchar(255) not null, "state" varchar(255) not null, "zip" varchar(255) not null, "skills" jsonb not null, "preferences" varchar(255) null, "availability" jsonb not null, "created_at" timestamptz not null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
