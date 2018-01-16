import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Beer } from './beer';
import "rxjs/Rx";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BeerService {
  private _baseUrl: string = "https://rocky-bayou-96357.herokuapp.com/https://api.brewerydb.com/v2/"
  private _allBeersUrl: string = this._baseUrl + "beers?glasswareId=1&withBreweries=Y"
  private _randomBeerUrl: string = this._baseUrl + "beer/random?hasLabels=Y&withBreweries=Y";
  private _beerByIdUrl: string = this._baseUrl + "beer/oeGSxs&key="
  private _searchUrl: string = this._baseUrl + 'search?q='
  beerAnnouncedSource = new Subject<Beer>();
 
  result: any;
  ageChecked : boolean = false;
  apiKey: string = "&key=af92fb7b6a111f9e932034edbe4faa07";
  beers: Array<Beer>;
  beerAnnounced$ = this.beerAnnouncedSource.asObservable();
  beer: Beer;
  categories: any;
  breweries: any;
  searchResults: any;
  alreadyLoaded: boolean = true;
  searchEnabled : boolean = false;

  constructor(private _http: HttpClient, private spinnerService: Ng4LoadingSpinnerService) { }

  getBeers() {
   
    if (!this.result) {
      this.spinnerService.show();
      
      return this.result = this._http.get(this._allBeersUrl + this.apiKey)
        .publishReplay(1)
        .refCount()
        .catch(this.handleError);
    }

    this.spinnerService.hide();
    
    if(!(this.result instanceof Observable) )
    {
      this.beerAnnouncedSource.next(this.result);

    return Observable.of(this.result);
    }

    else{
      return this.result
    }
    
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
    this.spinnerService.show();
    debugger;
    if(term && term.length > 0 )
    {
        return new Promise((resolve, reject) => {
          return this._http.get(this._searchUrl + `${term}` + this.apiKey)
            .subscribe(res => {
              this.searchResults = res['data'];
              this.spinnerService.hide();
              if (cat !== "All" && cat !== undefined) {
                const filteredByCat = this.searchResults.filter(beer => (beer.style != undefined && beer.style.category.name === cat))
                this.beerAnnouncedSource.next(filteredByCat);
              }

              else {
                this.beerAnnouncedSource.next(this.searchResults);
                this.result = this.searchResults;
              }

              this.searchEnabled = true;
              resolve(this.beer);
            
            })
        });
      
    }
    this.spinnerService.hide();
    return(this.beer)
   
  }

  setAgeChecked() : boolean{
    if(!this.ageChecked)
    {
      this.ageChecked = true;
    }
  
   
    return this.ageChecked;
  }
  getBeer(id) {
    this.spinnerService.show();
    return new Promise((resolve, reject) => {

      this._http.get(this._baseUrl + '/beer/' + id + "?" + this.apiKey)
        .subscribe((res : Beer) => {
          this.beer = res;
          if (this.beer) {
            resolve(this.beer);
          }

        })
        this.spinnerService.hide();
    });


  }

  getRandomBeer() {
    this.spinnerService.show();
    return new Promise((resolve, reject) => {
      this._http.get(this._randomBeerUrl + this.apiKey)
        .subscribe((res : Beer) => {
          this.beer = res;
          resolve(this.beer);
          this.spinnerService.hide();
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
        .subscribe(res => {


        })

    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      this._http.get(this._baseUrl + "/categories?key=" + this.apiKey)
        .subscribe((res) => {
          this.categories = res['data'];
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


