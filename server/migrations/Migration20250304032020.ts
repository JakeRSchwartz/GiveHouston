import { Migration } from '@mikro-orm/migrations';

export class Migration20250304032020 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "event" add column "time" varchar(6) not null, add column "image" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "event" drop column "time", drop column "image";`);
  }

}
