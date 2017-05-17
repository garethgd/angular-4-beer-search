# BeerSearchAngular4

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

In order to run run install Node.js(https://nodejs.org/en/). In addition to this the angular-cli is needed.

To install it run:

`
npm install -g @angular/cli
`

The project connects to the [BreweryDB API](http://www.brewerydb.com/developers) and retrieves and displays an initial list of beers. The user can then search for beers through the input text field. 

Rxjs [Observables](http://reactivex.io/documentation/observable.html) are used to create a reactive data stream and the view is updated accordingly with the new beer list via Angular 4 animations.

The list of beers can be filtered by category and the dropdown menu is initialised by retrieving categories from the BreweryDB API.

You can click the random beer button to generate a random beer from the brewery database.

I also attempted to create new random beer from same brewery functionality but ran out of time.

## Development server

In order to avoid encountering a CORS error run the command  `ng serve --proxy proxy.config.json` command for a proxy path to the beer API. More information [here](https://www.youtube.com/watch?v=OjmZPPKaj6A).

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## SASS

Sass partials are created containing fonts and colors. In addition to this, I created a `mixins.scss` file with variables containing media queries for different screen sizes although this wasn't really used in the application I hope it gives an indication how SASS would be structured in a full scale application.

## Beer Service

The `beer.service.ts` file contains all the methods for the http requests used to retrieve data from the Brewery API. It provides persistant data to our components when needed. Some methods return Observables while some return Promises. I wanted to demonstrate how I am able to use both.

## Animations

The `animations.ts` file contains exported animations that are used thoughout the application. Creating animations like this in Angular 4 allows you to share simliar animations throughout all the components.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Attempted a few e2e tests but ran out of time for a full implementation.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
