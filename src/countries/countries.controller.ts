import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';

@Controller('countries')
@ApiTags('Countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all Country data in the world.' })
    findAllCountries() {
        return this.countriesService.findAllCountries();
    }

    // @Get('insert')
    // insertCountries(){
    //     return this.countriesService.insertCountries();
    // }

    @Get(':id')
    @ApiOkResponse({ description: 'Country details retrieved successfully' })
    @ApiNotFoundResponse({ description: 'Country not found' })
    @ApiOperation({ summary: 'Get Name of a country by ID,from ID 1 - 196 all country in the world.**note : 175 is Thailand. ' })
    findOneCountries(@Param('id') id: string) {
        return this.countriesService.findOneCountries(id);
    }
}