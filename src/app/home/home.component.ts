import { Component, OnInit , NgZone} from '@angular/core';
import { BeerService } from '../beer.service';
import { Beer } from '../beer';
import { routerTransition, moveInLeft } from '../animations'
import 'rxjs/add/operator/publish'
import { Subscription } from 'rxjs/Subscription'
import { ChangeDetectorRef } from '@angular/core';
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
  errorMsg: String;
  constructor(private _beerService: BeerService,  private cdRef: ChangeDetectorRef, private zone:NgZone) {

  }
 
  ngOnInit() {
   
    this.getBeers();
     this.listenForBeerStream();
  

  }


  listenForBeerStream() {
    this._beerService.beerAnnounced$.subscribe(
      beers => {
        let beerStream = new Array();

        for (let key in beers) {
          if (beers.hasOwnProperty(key)) {
            beerStream.push(beers[key]);
          }
        }
        
        this.beers = beerStream.slice()
        
      }
    )

  }

  getBeers() {
    var obsBeers = this._beerService.getBeers();
    var hot = obsBeers.publish();
    obsBeers.subscribe(res =>
      this.beers = res.data,
      error => { this.errorMsg = error }
    )
    hot.connect();
  }
}
