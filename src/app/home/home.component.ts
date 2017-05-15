import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';
import { Beer } from '../beer';
import { routerTransition, moveInLeft } from '../animations'
import 'rxjs/add/operator/publish'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition, moveInLeft],
  host: { '[@routerTransition]': '' },


})
export class HomeComponent implements OnInit {


  beers: Beer[];
  categories: any;
  subscription: Subscription

  constructor(private _beerService: BeerService) {
    _beerService.beerAnnounced$.subscribe(
      beer => {
        console.log(this.beers);
        this.beers.push(null)
        this.beers.push(beer)
      }
    )

  }

  ngOnInit() {

    var obsBeers = this._beerService.getBeers();
    var hot = obsBeers.publish();

    obsBeers.subscribe(res => {
      this.beers = res.data;
      error => console.log(<any>error);

    })
    hot.connect();

    // this.categories = this.beers.map(beer => {
    //   beer.description
    //   console.log(beer.description)
    //   // console.log(beer.style.category.name)
    //   //   categories.push(beer.style.category.name)

    // })
    console.log(this.categories)
  }

}