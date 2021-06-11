import {
  JoinColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { Length, IsDate, Min, Max } from 'class-validator';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import RoleEntity from './roleEntity';

@Entity('member')
export class MemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') //auto-increment
  @Length(6, 20)
  id: number;

  @Column()
  memberName: string;

  @Column({ type: 'date', default: () => new Date() })
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  @Min(1)
  @Max(12)
  password: string;

  @Column({ type: 'date', default: () => new Date() })
  @IsDate()
  @CreateDateColumn()
  lastLoginDate: Date;

  //@OneToMany(() => RoleEntity (roles) => roles.member)
  //@JoinColumn({ name: 'roleId' })
  @Column({ type: 'int' })
  roles: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  constructor(memberName: string, password: string) {
    super();
    this.memberName = memberName;
    this.password = password;
  }

  toResponseObject(showToken: boolean = true) {
    const { id, memberName, createdDate, lastLoginDate } = this;
    const responseObj = {
      id,
      memberName,
      createdDate,
      lastLoginDate,
    };

    if (showToken) {
      responseObj['token'] = this.token;
    }

    return responseObj;
  }

  private get token() {
    const { id, memberName } = this;
    return jwt.sign({ id, memberName }, process.env.SECRET, {
      expiresIn: '7d',
    });
  }
}

export default MemberEntity;
function PrimaryColumn(arg0: { nullable: boolean }) {
  throw new Error('Function not implemented.');
}
