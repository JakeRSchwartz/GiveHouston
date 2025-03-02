import { Entity, PrimaryKey, Property, Unique, Collection, ManyToMany} from '@mikro-orm/core';
import { User } from './user.entity';
import { Event } from './event.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Skill {
  @PrimaryKey({
    columnType: 'uuid',
  })
  id: string = uuidv4();


  @Property({ unique: true,
    length: 50,
   }) 
  name!: string;

  @ManyToMany(() => User, (user) => user.skills, {mappedBy: 'skills'})
  users = new Collection<User>(this);

  @ManyToMany(() => Event, (event) => event.skills, {mappedBy: 'skills'})
  events = new Collection<Event>(this);


}
