import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'johnny@example.com',
    description: 'The name of the user.',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'eventpass123',
    description: 'The password of the user more than 6 character.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}