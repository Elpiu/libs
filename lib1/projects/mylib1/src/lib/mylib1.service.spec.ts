import { TestBed } from '@angular/core/testing';

import { Mylib1Service } from './mylib1.service';

describe('Mylib1Service', () => {
  let service: Mylib1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mylib1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
