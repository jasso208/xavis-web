import { TestBed } from '@angular/core/testing';

import { GeneraCuponService } from './genera-cupon.service';

describe('GeneraCuponService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneraCuponService = TestBed.get(GeneraCuponService);
    expect(service).toBeTruthy();
  });
});
