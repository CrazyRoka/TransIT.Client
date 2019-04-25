import { TestBed } from '@angular/core/testing';

import { MalfunctionsFilterService } from './malfunctions-filter.service';

describe('MalfunctionsFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MalfunctionsFilterService = TestBed.get(MalfunctionsFilterService);
    expect(service).toBeTruthy();
  });
});
