import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany
} from '@mikro-orm/core';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Availability {
  @PrimaryKey(
    {
    columnType: 'uuid',
})
  id: string = uuidv4();


  @Property({
    type: 'date'
  })
  date!: Date;

  @ManyToMany(() => User, user => user.availability, {mappedBy: 'availability'})
  user = new Collection<User>(this); //check this
}
