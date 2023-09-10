import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Countries } from './countries.model';

@Injectable()
export class CountriesService {
    private countriesData: any[];

    constructor(
        @InjectModel('Countries') private readonly CountriesModel: Model<Countries>) {
        this.readCountriesData();
    }

    async createCountry(id: string, name: string): Promise<Countries> {
        const newCountry = new this.CountriesModel({ id, name });
        return await newCountry.save();
    }

    private readCountriesData() {
        try {
            const data = fs.readFileSync('./src/config/countries.json', 'utf-8');
            this.countriesData = JSON.parse(data);
        } catch (error) {
            console.error('Error reading JSON file:', error);
        }
    }

    // for insert all countries from json file to mongo db
    insertCountries() {
        // commend becase already insert
        // this.countriesData.forEach(async item => {
        //     await this.createCountry(item.id, item.name);
        // });
        const response = {
            status: true,
            message: 'Insert complete.'
        };
        return response;
    }

    async findAllCountries(){
        const countries = await this.CountriesModel.find().select('id name -_id').exec();
        countries.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
        return countries;
    }

    async findOneCountries(id: string): Promise<Countries> {
        const country = await this.CountriesModel.findOne({ id }).select('id name -_id').exec();
        if (!country) {
            throw new NotFoundException(`Country with ID ${id} not found`);
        }
        return country;
    }
}