import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { BeerService } from '../beer.service';
import { Beer } from '../beer';
import { moveIn } from '../animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [moveIn],
  host: { '[@moveIn]': '' },
})
export class SearchComponent implements OnInit {

  items: Observable<Array<string>>;
  term = new FormControl();
  beers: Array<Beer>;
  categories: {};
  constructor(private _beerService: BeerService) { }

  ngOnInit() {
    this.initializeDropDowns()

    //Match values from streamed array to what is typed
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
    // .subscribe(data => this.displayMatches(data)),
    // function (error) { console.log("Error happened" + error) },
    // function () { console.log("the subscription is completed") }



    // })
  }
  initializeDropDowns() {
    this._beerService.getBeers()
      .subscribe((res: Beer[]) => {
        this.beers = res;
        this._beerService.getCategories().then(res => {
          this.categories = res;
          console.log(this.categories)


        })
      })
  }
  searchTerm(category) {
    console.log(category);
    this._beerService.searchBeer("hello")
  }
}

