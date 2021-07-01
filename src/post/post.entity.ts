import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  content: string;
}
