import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { BeerService } from '../beer.service';
import { Beer } from '../beer';
import { moveIn } from '../animations';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [moveIn],
  host: { '[@moveIn]': '' },
})
export class SearchComponent implements OnInit {

  term = new FormControl();
  beers: Array<Beer>;
  categories: {};
  currentCategory: String;
  constructor(private _beerService: BeerService) { }

  ngOnInit() {
    this.initializeDropdowns()
    this.listenForInput();
  }

  initializeDropdowns() {
    this._beerService.getBeers()
      .subscribe((res: Beer[]) => {
        this.beers = res;
        this._beerService.getCategories().then(res => {
          this.categories = res;
        })
      })
  }

  listenForInput() {
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => this.searchTerm(term, this.currentCategory)),
      function (error) { console.log("Error happened" + error) },
      function () { console.log("the subscription is completed") }
  }
  currentCat(cat) {
    this.currentCategory = cat;
    this.searchTerm(this.term.value, cat)

  }
  searchTerm(search, category) {
    this._beerService.searchBeer(search, category)
  }
}

