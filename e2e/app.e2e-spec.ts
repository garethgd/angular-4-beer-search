import { BeerPage } from './app.po';

describe('programme-track App', () => {
  let page: BeerPage;

  beforeEach(() => {
    page = new BeerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
