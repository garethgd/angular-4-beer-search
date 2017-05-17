import { BeerPage } from './app.po';
import { browser, element, by } from 'protractor';
describe('programme-track App', () => {
  let page: BeerPage;

  beforeEach(() => {
    page = new BeerPage();
  });

  it("should show a beer title for the random beer", () => {  
    browser.get("/randombeer");
    let beerTitle = element.all(by.css(".beer-title"));
    expect(beerTitle.count()).toEqual(1);
})

it("should be able to click on a beer title on the homepage and get to the details page", () => {  
    browser.get("/");
    let firstBeerTitle = element.all(by.css(".beer-title")).first();
    let beerTitleText = firstBeerTitle.getText();

    firstBeerTitle.click();
    let detailTitle = element(
          by.css(".beer-name")).getText();

    expect(detailTitle).toEqual(firstBeerTitle);
})
});
