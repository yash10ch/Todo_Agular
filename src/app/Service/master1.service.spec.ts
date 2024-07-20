import { TestBed } from '@angular/core/testing';

import { Master1Service } from './master1.service';

describe('Master1Service', () => {
  let service: Master1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Master1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
