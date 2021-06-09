import { EntityRepository, Repository } from 'typeorm';
import { MemberEntity } from '../entities/memberEntity';
import MemberDto from '../dto/memberDto';

var dummyMember = {
  id: '001',
  memberName: 'root',
  password: 'root',
  roles: 1,
  createdDate: new Date(),
  updatedDate: new Date(),
  lastLoginDate: new Date(),
};

@EntityRepository()
export class MemberRepository extends Repository<MemberEntity> {
  signIn(memberDto: MemberDto) {
    const { memberName, password } = memberDto;

    return dummyMember.memberName === memberName &&
      dummyMember.password === password
      ? dummyMember
      : dummyMember;

    // this.createQueryBuilder('member')
    //   .where('id = (id)', { id })
    //   .andWhere('password = (password)', { password })
    //   .getOne();
  }

  findMember(memberDto: MemberDto) {
    const { memberName, password } = memberDto;

    return dummyMember.memberName === memberName &&
      dummyMember.password === password
      ? dummyMember
      : null;
  }
}
