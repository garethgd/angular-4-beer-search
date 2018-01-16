import { Component, OnInit } from '@angular/core';
import { routerTransition, moveInLeft } from '../animations';
import { Beer } from '../beer';
import { HttpClientModule } from '@angular/common/http'; 
import { SeoService } from '../seo.service';
import { HttpModule } from '@angular/http';
import { BeerService } from '../beer.service';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-random-beer',
  templateUrl: './random-beer.component.html',
  styleUrls: ['./random-beer.component.scss'],
  animations: [routerTransition, moveInLeft],
  host: { '[@routerTransition]': '' },

})
export class RandomBeerComponent implements OnInit {
  beer: Beer;
  state: string = '';
  constructor(private _beerService: BeerService,private seo: SeoService ) { }

  ngOnInit() {

    this.seo.generateTags({
      title: 'Random Beer Page', 
      description: 'Detailed information about your random beer.', 
      image: 'https://angularfirebase.com/images/logo.png',
      slug: 'Detail-Page',
    })

    this.beer = undefined;
    this.anotherBeer();
  }
  anotherBeer() {
  
    this._beerService.getRandomBeer().then((res : JSON) => {
  
      this.beer = res['data'];
   
      if (!this.beer.description || !this.beer.labels) {
        this.anotherBeer();
      }
    });
  }

  moreFromBrewery() {
    this._beerService.getBeerFromBrewery(this.beer);
  }

}
