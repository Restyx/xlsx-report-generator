import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  PENDING = 'pending',
  COMPLETE = 'completed',
  FAILED = 'failed',
}

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  service_name: string;

  @Column()
  endpoint: string;

  @Column('text', { name: 'headers_array', array: true })
  headers: string[];

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({ nullable: true })
  download_link: string;
}
