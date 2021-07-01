import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  content: string;
}
