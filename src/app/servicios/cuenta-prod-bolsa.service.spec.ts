import { TestBed } from '@angular/core/testing';

import { CuentaProdBolsaService } from './cuenta-prod-bolsa.service';

describe('CuentaProdBolsaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaProdBolsaService = TestBed.get(CuentaProdBolsaService);
    expect(service).toBeTruthy();
  });
});
