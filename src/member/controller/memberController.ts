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
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MemberService } from '../service/memberService';
import MemberDto from '../dto/memberDto';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { Token } from '../decorator/member.decorator';

@Controller('/api/member')
export class MemberController {
  private readonly logger = new Logger();
  constructor(private readonly memberService: MemberService) {}

  @Post('/signIn')
  @ApiTags('관리자 로그인')
  async signIn(@Body() memberDto: MemberDto, @Res() response: Response) {
    const existMember = this.memberService.signIn(memberDto);
    return response
      .status(HttpStatus.OK)
      .json((await existMember).toResponseObject(true));
  }

  @Get('/validateMember')
  @ApiTags('관리자 아이디 확인')
  validateMember(@Req() memberDto: MemberDto, @Res() response: Response) {
    const memberStatus = this.memberService.validateMember(memberDto);
    return response.status(HttpStatus.OK).json(memberStatus);
  }

  @Get('/findAll')
  @ApiTags('모든 유저의 정보 조회')
  @UseGuards(new AuthGuard())
  findAll(
    @Res() response: Response,
    @Token(new ValidationPipe({ validateCustomDecorators: true })) token,
  ) {
    //const members = this.memberService.findAll();
    return response.status(HttpStatus.OK).json('기능 완성 중');
  }

  @Get('/createManager')
  @ApiTags('최고 관리자 생성')
  createManager(@Query() memberDto: MemberDto, @Res() response: Response) {
    this.memberService.createMember(memberDto);
    return response.status(HttpStatus.OK).json('생성 완료');
  }
}
