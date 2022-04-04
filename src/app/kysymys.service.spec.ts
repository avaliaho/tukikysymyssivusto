import { TestBed } from '@angular/core/testing';

import { KysymysService } from './kysymys.service';

describe('KysymysService', () => {
  let service: KysymysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KysymysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
