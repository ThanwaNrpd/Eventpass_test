import { Controller, Post, Get, Req, Body, ConflictException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as config from '../config/config.json';
import { ApiTags, ApiBody, ApiBearerAuth, ApiCreatedResponse, ApiConflictResponse, ApiOperation, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user'})
    @ApiCreatedResponse({ description: 'User registration successful.' })
    @ApiConflictResponse({ description: 'Email address is already registered.' })
    async registerUser(@Body() createUserDto: CreateUserDto) {
        // Check if the email is already taken or not?
        const isEmailTaken = await this.usersService.CheckEmailTaken(createUserDto.email);
        if (isEmailTaken) {
            throw new ConflictException('Email address is already registered, Please try again with another email.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // You can adjust the number of rounds as needed

        // Proceed with user registration
        const user = await this.usersService.createUser(createUserDto.name, createUserDto.email, hashedPassword, createUserDto.countryId);

        const user_data = await this.usersService.check_country(user);

        // // Generate a JWT token
        // const token = jwt.sign({ sub: user.id, email: user.email }, config.jwtSecretKey, {
        //     expiresIn: '2h', // Token expiration time
        // });

        const response = {
            status: true,
            message: 'Registration successful.',
            user: user_data,
            // token: token
        };

        return response;
    }

    @Post('login')
    async loginUser(@Body() loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(email);

        // Check if the user exists and the password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // Generate a JWT token
        const token = jwt.sign({ sub: user.id, email: user.email }, config.jwtSecretKey, {
            expiresIn: '2h', // Token expiration time
        });

        return { token };
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT')
    async getUsers(@Req() req) {
        // console.log('Request Headers:', req.headers);
        const users = await this.usersService.getRegisteredUsers();
        const response = {
            message: '-->Fectch all register user By Bearer Authentication from token from login API.<-- The data shown here is What I understand from The question given in the last.',
            data: users
        }
        return response;
    }
}
