import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  Res,
  HttpStatus,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { MemberService } from '../service/memberService';
import MemberDto from '../dto/memberDto';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { Token } from '../decorator/member.decorator';
import MemberEntity from '../entities/memberEntity';
@Controller('/api/member')
export class MemberController {
  private readonly logger = new Logger();
  constructor(private readonly memberService: MemberService) {}

  @Post('/signIn')
  @ApiTags('관리자 로그인')
  async signIn(@Body() memberDto: MemberDto, @Res() response: Response) {
    const existMember = await this.memberService.signIn(memberDto);
    return response
      .status(HttpStatus.OK)
      .json(existMember.toResponseObject(true));
  }

  @Get('/createManager')
  @ApiTags(
    `최고 관리자 생성 생성 및 role 생성 API' 
     개발 완료 후, 해당 API는 삭제.`,
  )
  createManager(@Res() response: Response) {
    const msg = this.memberService.createManager(process.env.managerName);
    return response.status(HttpStatus.OK).json(msg);
  }

  @Get('/validateManagerRole')
  @ApiTags('token 유효성 검사 및 관리자의 role 확인')
  @UseGuards(new AuthGuard())
  async validateManaerRole(
    @Query() memberDto: MemberDto,
    @Res() response: Response,
    @Token() token,
  ) {
    const managerRole = await this.memberService.validateManagerRole(
      memberDto.memberName,
    );
    return response.status(HttpStatus.OK).json(managerRole);
  }

  @Get('/findAll')
  @ApiTags('모든 관리자의 정보 조회')
  @UseGuards(new AuthGuard())
  async findAll(@Res() response: Response) {
    const members: MemberEntity[] = await this.memberService.findAll();
    return response.status(HttpStatus.OK).json(members);
  }
}
