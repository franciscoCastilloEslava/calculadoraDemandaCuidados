import { TestBed } from '@angular/core/testing';

import { PopulationsService } from './populations.service';

describe('PopulationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopulationsService = TestBed.get(PopulationsService);
    expect(service).toBeTruthy();
  });
});
