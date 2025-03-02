import { Migration } from '@mikro-orm/migrations';

export class Migration20250302215709 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "attending_events" ("id" serial primary key, "user_id" uuid not null, "event_id" uuid not null, "sign_up_date" timestamptz not null);`);

    this.addSql(`alter table "attending_events" add constraint "attending_events_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "attending_events" add constraint "attending_events_event_id_foreign" foreign key ("event_id") references "event" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "attending_events" cascade;`);
  }

}
