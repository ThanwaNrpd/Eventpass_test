import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'Johnny Depp',
        description: 'The name of the user.',
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        example: 'johnny@example.com',
        description: 'The email address of the user.',
    })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        example: 'eventpass123',
        description: 'The password of the user more than 6 character.',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @ApiProperty({
        example: '175',
        description: 'The ID of the country',
    })
    @IsString()
    @IsNotEmpty()
    readonly countryId: string;
}
