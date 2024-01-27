import { TestBed } from '@angular/core/testing';

import { DetailsProductService } from './details-product.service';

describe('DetailsProductService', () => {
  let service: DetailsProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
