import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Beer } from './beer';
import "rxjs/Rx";
import { Subject } from 'rxjs/Subject';


@Injectable()
export class BeerService {
  private _baseUrl: string = "https://api.brewerydb.com/v2"
  private _allBeersUrl: string = this._baseUrl + "/beers?glasswareId=1&withBreweries=Y"
  private _randomBeerUrl: string = this._baseUrl + "/beer/random?hasLabels=Y&withBreweries=Y";
  private _beerByIdUrl: string = this._baseUrl + "/beer/oeGSxs&key="
  private _searchUrl: string = this._baseUrl + '/search?q='
  private beerAnnouncedSource = new Subject<Beer>();

  result: any;
  apiKey: string = "&key=1c1c369a4b8d96448691c064c302323d";
  beers: Array<Beer>;
  beerAnnounced$ = this.beerAnnouncedSource.asObservable();
  beer: Beer;
  categories: any;
  breweries: any;
  searchResults: any;
  alreadyLoaded: boolean = false;

  constructor(private _http: Http) { }

  getBeers() {



    // return new Promise((resolve, reject) => {

    this.result = this._http.get(this._allBeersUrl + this.apiKey)
      .map(res => res.json());
    return this.result;


    //   if (this.result) {
    //     resolve(this.result);
    //   }

    // })


  }

  searchBeer(term) {

    console.log(this.beerAnnouncedSource);
    console.log(this.beerAnnouncedSource);
    this.beerAnnounced$ = null;
    console.log(this._searchUrl + `${term}` + "&key=" + this.apiKey)

    return new Promise((resolve, reject) => {
      return this._http.get(this._searchUrl + `${term}` + "&key=" + this.apiKey).map(res => res.json())
        .subscribe(res => {
          this.searchResults = res.data;
          console.log(this.searchResults)
          resolve(this.beer);
        })

    });
  }
  sortAlpha(beers) {


    console.log(this.result.breweries);
    const fullNames = beers.map(beer => {

      if (beer.style != undefined) {

        `${beer.style.category.name}`
      }

      else {
        return '';
      }

    })
    console.log(fullNames)


    // fullNames.sort((lastOne, nextOne) => {

    //   console.log(lastOne, nextOne);
    // });
  }

  getBeer(id) {

    return new Promise((resolve, reject) => {

      this._http.get(this._baseUrl + '/beer/' + id + "?" + this.apiKey)
        .map(res => res.json())
        .subscribe(res => {
          this.beer = res.data

          if (this.beer) {
            resolve(this.beer);
          }

        })

    });

  }

  getRandomBeer() {

    return new Promise((resolve, reject) => {
      this._http.get(this._randomBeerUrl + this.apiKey)
        .map(res => res.json())
        .subscribe(res => {
          this.beer = res.data
          resolve(this.beer);
        })

    });

  }

  getBeerFromBrewery(beer) {


    if (this.breweries) {
      console.log(this.breweries)
      return Promise.resolve(this.breweries);
    }

    return new Promise((resolve, reject) => {
      console.log(this._allBeersUrl + "/categories&key=" + this.apiKey)
      this._http.get(this._allBeersUrl + "/categories&key=" + this.apiKey)

        .map(res => res.json())
        .subscribe(res => {
          // this.result = res.data


          // if (this.result) {
          //   resolve(this.result);
          // }

        })

    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      console.log(this._baseUrl + "/categories&key=" + this.apiKey)
      this._http.get(this._baseUrl + "/categories?key=" + this.apiKey)

        .map(res => res.json())
        .subscribe(res => {
          this.categories = res.data


          if (this.categories) {
            let categories = Array.from(new Set(this.categories));
            console.log(categories);
            resolve(categories);
          }

        })
    })




    // const categoryOptions = beers.filter(beer => {
    //   if (typeof (beer.style) !== 'undefined') {
    //     return beer.style.category.name
    //   }
    // }).map(beer => {
    //   return beer.style.category.name
    // })

    // let categories = Array.from(new Set(categoryOptions));

    // return categories
  }
}


