import { TestBed } from '@angular/core/testing';

import { Service5Service } from './service5.service';

describe('Service5Service', () => {
  let service: Service5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
