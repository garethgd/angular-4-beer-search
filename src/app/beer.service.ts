import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Beer } from './beer';
import "rxjs/Rx";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BeerService {
  private _baseUrl: string = "/api/v2/"
  private _allBeersUrl: string = this._baseUrl + "beers?glasswareId=1&withBreweries=Y"
  private _randomBeerUrl: string = this._baseUrl + "beer/random?hasLabels=Y&withBreweries=Y";
  private _beerByIdUrl: string = this._baseUrl + "beer/oeGSxs&key="
  private _searchUrl: string = this._baseUrl + 'search?q='
  beerAnnouncedSource = new Subject<Beer>();

  result: any;
  apiKey: string = "&key=fe3b565be63e7886800b4be821be6c4a";
  beers: Array<Beer>;
  beerAnnounced$ = this.beerAnnouncedSource.asObservable();
  beer: Beer;
  categories: any;
  breweries: any;
  searchResults: any;
  alreadyLoaded: boolean = false;

  constructor(private _http: Http) { }

  getBeers() {

    if (!this.result) {
      return this.result = this._http.get(this._allBeersUrl + this.apiKey)
        .map((res: Response) => res.json())
        .publishReplay(1)
        .refCount()
        .catch(this.handleError);
    }

    return this.result;


  }
  handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.errorMessage || JSON.stringify(body);
      errMsg = ` ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  searchBeer(term, cat) {

    return new Promise((resolve, reject) => {
      return this._http.get(this._searchUrl + `${term}` + this.apiKey).map(res => res.json())
        .subscribe(res => {
          this.searchResults = res.data;

          if (cat !== "All" && cat !== undefined) {
            const filteredByCat = this.searchResults.filter(res => (res.style != undefined && res.style.category.name === cat))
            this.beerAnnouncedSource.next(filteredByCat);
          }

          else {
            this.beerAnnouncedSource.next(this.searchResults);
          }

          resolve(this.beer);
        })
    });
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


        })

    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      this._http.get(this._baseUrl + "/categories?key=" + this.apiKey)
        .map(res => res.json())
        .subscribe(res => {
          this.categories = res.data
          
          if (this.categories) {
            let categories = Array.from(new Set(this.categories));
            resolve(categories);
          }
          else {
            reject("Categories Undefined")
          }

        })
    })

  }
}


