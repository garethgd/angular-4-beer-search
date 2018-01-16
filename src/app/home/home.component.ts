import { Component, OnInit , ElementRef, NgZone} from '@angular/core';
import { BeerService } from '../beer.service';
import { Beer } from '../beer';
import { routerTransition, moveInLeft } from '../animations'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/publish';
import { SeoService } from '../seo.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'


@Injectable()

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routerTransition, moveInLeft],
  host: { '[@routerTransition]': '' },
})

export class HomeComponent implements OnInit {

  beers: Beer[];
  btn;
  span;
  check: string;
  options;
  ageText: Element;
  modal : Element;
  categories: any;
  ageCheck: string;
  searchEnabled:boolean;
  errorMsg: String;
  alreadyChecked : boolean;
  constructor(private _beerService: BeerService,
              private _spinerService: Ng4LoadingSpinnerService,
              private seo: SeoService,
              private zone:NgZone,
              private cdRef: ChangeDetectorRef
              ) {
               this.check = "dgdfgdf"
               this.alreadyChecked = this._beerService.ageChecked;
              
  }
 
  ngOnInit() {
    
    this.check= "sgfdgdfg";
    this.modal = document.querySelector('.model-wrapper');
    this.ageText =  document.querySelector('.ageText');
    debugger;
   
    this.btn =  document.getElementById("myBtn");
    this.span =  document.getElementsByClassName("close")[0];
    this.ageCheck = "Are you over 21?";
    this.searchEnabled = this._beerService.searchEnabled;

    if(!this.searchEnabled)
    this.getBeers();
    this.listenForBeerStream();

    this.seo.generateTags({
      title: 'Beer Name Finder - Home', 
      description: 'Search through beer names from a brewery database.', 
      image: 'https://angularfirebase.com/images/logo.png',
      slug: 'Home-Page',
    })
    this.options = document.querySelector('.options')
 
  }
 


// When the user clicks on the button, open the modal 
handleYes= function() {
     this.modal.style.display = "none";
     this.alreadyChecked = this._beerService.setAgeChecked();
}

// When the user clicks on the button, open the modal 
handleNo = function() {
    this.modal.style.display = "block";
   // this.ageText.style.lineHeight = "3rem";
    this.ageCheck = "Sorry you cannot enter."
    this.options = document.querySelector('.options');
   this.options.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
handleSpan = function() {
    this.modal.style.display = "none";
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
    
   // 
  }



  getBeers() {
    this._spinerService.show()
    var obsBeers = this._beerService.getBeers();
    var hot = obsBeers.publish();
    obsBeers.subscribe((res) =>{
      this.beers = res.data;
      this._spinerService.hide();
    
      error => { this.errorMsg = error }
    }
    )
    hot.connect();
  }


  
}
