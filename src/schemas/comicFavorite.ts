import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comicsFavorites')
class ComicsFavorites {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  comicId: number;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  detail?: string;

  @Column()
  published?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ComicsFavorites;
