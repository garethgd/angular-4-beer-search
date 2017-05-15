import { TestBed, inject } from '@angular/core/testing';

import { BeerService } from './beer.service';

describe('ProgrammeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeerService]
    });
  });

  it('should ...', inject([BeerService], (service: BeerService) => {
    expect(service).toBeTruthy();
  }));
});
