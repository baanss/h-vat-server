import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User Email(Account)',
    example: 'test@test.com',
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    description: 'User Password',
    example: 'NEED_TO_CHANGE!',
    required: true,
  })
  readonly password: string;
}
