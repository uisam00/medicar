import { TestBed } from '@angular/core/testing';

import { PublicGuard } from './public-guard';

describe('PublicGuard', () => {
  let service: PublicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
