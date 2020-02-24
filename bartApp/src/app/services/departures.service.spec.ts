import { TestBed } from '@angular/core/testing';

import { DeparturesService } from './departures.service';

describe('DeparturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeparturesService = TestBed.get(DeparturesService);
    expect(service).toBeTruthy();
  });
});
