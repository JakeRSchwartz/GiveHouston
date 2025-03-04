import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property
} from '@mikro-orm/core';
import { Skill } from './skill.entity';
import { AttendingEvents } from './attendingEvents.entity';
import { v4 as uuidv4 } from 'uuid';
import { Tags } from './tags.entity';

@Entity()
export class Event {
  @PrimaryKey({
    columnType: 'uuid'
  })
  id: string = uuidv4();

  @Property({
    length: 100
  })
  title!: string;

  @Property({
    type: 'text'
  })
  description!: string;

  @Property(
    {
      type: 'date'
    }
  )
  date!: Date;

  @Property({
    length: 10
  })
  urgency!: string;

  @Property({
    type: 'text'
  })
  location!: string;

  @Property({
    length: 10
  })
  time!: string;

  @Property({
    type: 'text'
  })
  image?: string;

  @ManyToMany(() => Skill, skill => skill.events, { owner: true })
  skills = new Collection<Skill>(this);

  @ManyToMany(() => Tags, tag => tag.events, { owner: true })
  tags = new Collection<Tags>(this);

  @OneToMany(() => AttendingEvents, attendedEvents => attendedEvents.event)
  attendedEvents = new Collection<AttendingEvents>(this);
}
