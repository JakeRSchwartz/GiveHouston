import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany,
} from '@mikro-orm/core';
import { Event } from './event.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Tags {
  @PrimaryKey({
    columnType: 'uuid',
  })
  id: string = uuidv4();

  @Property({ unique: true,
    length: 30,
    })
    name!: string;

    @ManyToMany(() => Event, (event) => event.tags, {mappedBy: 'tags'})
    events = new Collection<Event>(this);
}

