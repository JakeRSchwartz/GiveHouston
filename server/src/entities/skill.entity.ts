import { Entity, PrimaryKey, Property, Unique, Collection, ManyToMany} from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Skill {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true }) 
  name!: string;

  @ManyToMany(() => User, (user) => user.skills)
  users = new Collection<User>(this);
}
