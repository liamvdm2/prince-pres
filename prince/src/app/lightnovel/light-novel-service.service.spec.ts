import { TestBed } from '@angular/core/testing';

import { LightNovelServiceService } from './light-novel-service.service';

describe('LightNovelServiceService', () => {
  let service: LightNovelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightNovelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
