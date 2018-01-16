import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';
import { Beer } from '../beer';
import { Router, ActivatedRoute } from '@angular/router';
import { SeoService } from '../seo.service';
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
  constructor(private _beerService: BeerService, private router: ActivatedRoute, private seo: SeoService) { }

  ngOnInit() {

    this.seo.generateTags({
      title: 'Detail Page', 
      description: 'Detailed information about your retrieved beer.', 
      image: 'https://angularfirebase.com/images/logo.png',
      slug: 'Detail-Page',
    })

    this.router.params.subscribe((params) => {
      let id = params['id'];
      this._beerService.getBeer(id)
        .then((res : JSON) => {
          this.beer =  res['data'];
          console.log(this.beer)
          
        })
    })
  }

}
