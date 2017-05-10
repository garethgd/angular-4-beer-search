import { ProgrammeTrackPage } from './app.po';

describe('programme-track App', () => {
  let page: ProgrammeTrackPage;

  beforeEach(() => {
    page = new ProgrammeTrackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
