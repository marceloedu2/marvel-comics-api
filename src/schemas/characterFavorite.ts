import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('charactersFavorites')
class CharacterFavorite {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  characterId: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url?: string;

  @Column()
  detail?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CharacterFavorite;
