import { TestBed } from '@angular/core/testing';

import { DeliveryboyserviceService } from './deliveryboyservice.service';

describe('DeliveryboyserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryboyserviceService = TestBed.get(DeliveryboyserviceService);
    expect(service).toBeTruthy();
  });
});
