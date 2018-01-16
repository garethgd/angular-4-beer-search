import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Http ,HttpModule} from '@angular/http' 
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerService } from './beer.service';
import { NavComponent } from './nav/nav.component';
import { SeoService } from './seo.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { LengthPipe } from './length.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RandomBeerComponent } from './random-beer/random-beer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SearchComponent,
    DetailsComponent,
    LengthPipe,
    RandomBeerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'findBeerApp'}),
    Ng4LoadingSpinnerModule.forRoot(),
    HttpModule,
    FormsModule,
    HttpClientModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [BeerService, HttpClientModule, HttpModule, SeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
