import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Travels, TravelID } from './travels';
import { createNewTravel } from './createTravel.dto';
import {updateTravel} from './updateTravel.dto';
import { identity } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }


  travel: TravelID[] = [
    {
      id:1,
      destination: "Japan",
      description:
        "Go hiking on Mt. Fuji, visit the Tokyo Imperial Palace, or just relax at a traditional, family owned hot spring resort.",
      imgURL:
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Views_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg",
      price: 199_999,
      discount: 10,
    },
    {
      id:2,
      destination: "Iceland",
      description:
        "Visit the Blue Lagoon, see the Northern Lights, or take a walk on a glacier.",
      imgURL:
        "https://upload.wikimedia.org/wikipedia/commons/4/4e/Iceland%2C_Landmannalaugar%2C_2014-08-16%2C_DD_123.JPG",
        price: 299_999,
        discount: 5,
    }
  ];
  nextID = 3;


 
  // GET /travels
  // Kilistázza az összes úticélt
  @Get('travels')
  getAllTravels() {
    return this.travel;
  }
  // GET /travels/:id
  // Visszaadja az adott ID-jű utazás részleteit
  @Get('travels/:id')
  getTravelById(@Param('id') id: string) {
    const IDnumber = parseInt(id);
    const traveling = this.travel.find(traveling => traveling.id === IDnumber);
    

    return traveling;
  }
//POST /travels
//Létrehoz egy új utazást. Létrehozáskor az utazási cél, leírás, kép, ár tulajdonságokat kell megadni.
//A kedvezmény értéke létrehozáskor legyen 0.
  @Post('travels')
  @HttpCode(201)
  createNewTravel(@Body() travel: createNewTravel) {
    const newTravel: TravelID = {
      id: this.nextID++,
      destination: travel.destination,
      description: travel.description,
      imgURL: travel.imgURL,
      price: travel.price,
      discount: 0,
    };

    this.travel.push(newTravel);
    return newTravel;
  
  }

  // PATCH /travels/:id
  // Módosítja az adott utazás adatait. Az id-n kívül minden adat módosítható!
  @Patch('travels/:id')
  @HttpCode(200)
  changeTravel(@Param('id')id: string, @Body() updateTravel: updateTravel){
    const IDnumber = parseInt(id);
    const travelwithID = this.travel.find(travel => travel.id === IDnumber);
    const travelOriginal = this.travel[id];
    
    const newTravel: TravelID = {
      ...travelwithID,
      ...updateTravel
    };
    this.travel[travelOriginal] = newTravel;
    return newTravel;
  }

  @Delete('travels/:id')
  @HttpCode(204)
  deleteTravel(@Param('id') id: string){
    const IDnumber = parseInt(id);
    const travelID = this.travel.findIndex(travel => travel.id === IDnumber);
    this.travel.splice(travelID,1);   
  }
}


