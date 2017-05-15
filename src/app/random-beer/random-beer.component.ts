import { Component, OnInit } from '@angular/core';
import { routerTransition, moveInLeft } from '../animations';
import { Beer } from '../beer';
import { BeerService } from '../beer.service';


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
  constructor(private _beerService: BeerService) { }

  ngOnInit() {
    this.anotherBeer();
  }
  anotherBeer() {
    this.beer = undefined;
    this._beerService.getRandomBeer().then((res: Beer) => {
      this.beer = res;

      console.log(this.beer);
      if (!this.beer.description || !this.beer.labels) {
        this.anotherBeer();
      }
    });


  }
  moreFromBrewery() {
    this._beerService.getBeerFromBrewery(this.beer);
  }

}
