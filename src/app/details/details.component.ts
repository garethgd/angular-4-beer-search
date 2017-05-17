import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';
import { Beer } from '../beer';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition, moveInLeft } from '../animations'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [routerTransition,moveInLeft ],
  host: { '[@routerTransition]': '' }
})
export class DetailsComponent implements OnInit {

  beer: Beer;
  constructor(private _beerService: BeerService, private router: ActivatedRoute) { }

  ngOnInit() {

    this.router.params.subscribe((params) => {
      let id = params['id'];
      this._beerService.getBeer(id)
        .then((res: Beer) => {
          this.beer = res;
          
        })
    })
  }

}
