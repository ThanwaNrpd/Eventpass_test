import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { Countries } from '../countries/countries.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Countries') private readonly CountriesModel: Model<Countries>) {
    }


    async createUser(name: string, email: string, password: string, countryId: string): Promise<User> {
        const newUser = new this.userModel({ name, email, password, countryId });
        return await newUser.save();
    }

    async CheckEmailTaken(email: string): Promise<boolean> {
        const existingUser = await this.userModel.findOne({ email }).exec();
        return !!existingUser;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async check_country(user) {
        const country = await this.CountriesModel.findOne({ id: user.countryId }).exec();
        let country_name;
        if (!country) {
            country_name = "";
        }else{
            country_name = country.name;
        }
        let user_data = [{
            name: user.name,
            email: user.email,
            countryId: country_name
        }];

        return user_data;
    }
    async getRegisteredUsers() {
        const user = await this.userModel.find().exec();
        const country = await this.CountriesModel.find().exec();
        const countryIdToNameMap: { [key: string]: string } = {};
        country.forEach((country) => {
            countryIdToNameMap[country.id] = country.name;
        });
        let all_user = [];
        user.forEach(item => {
            const c_name = country.filter(c_item => c_item.id == item.countryId);
            all_user.push({
                'name': item.name,
                'email': item.email,
                'country': c_name[0].name
            })
        });
        return all_user;
    }
}
