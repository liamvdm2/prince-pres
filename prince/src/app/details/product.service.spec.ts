import { TestBed } from '@angular/core/testing';

import { ProductServiceDetails } from './productDetails.service';

describe('ProductService', () => {
  let service: ProductServiceDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServiceDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
