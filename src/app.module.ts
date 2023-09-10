import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesController } from './countries/countries.controller';
import { UsersController } from './users/users.controller';
import { CountriesService } from './countries/countries.service';
import { UsersService } from './users/users.service';
import * as config from './config/config.json';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import { CountriesModel, CountriesSchema } from './countries/countries.model'; 
import { UserModel, UserSchema } from './users/user.model'; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.mongodbURI),
    MongooseModule.forFeature([{ name: 'Countries', schema: CountriesSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.jwtSecretKey, 
      signOptions: { expiresIn: '2h' }, 
    }),
  ],
  controllers: [AppController, CountriesController, UsersController],
  providers: [AppService, CountriesService, UsersService, JwtStrategy],
})
export class AppModule { }
