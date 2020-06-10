import { TestBed } from '@angular/core/testing';

import { IsmerchantService } from './ismerchant.service';

describe('IsmerchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsmerchantService = TestBed.get(IsmerchantService);
    expect(service).toBeTruthy();
  });
});
