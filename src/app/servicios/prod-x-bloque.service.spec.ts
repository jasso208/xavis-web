import { TestBed } from '@angular/core/testing';

import { ProdXBloqueService } from './prod-x-bloque.service';

describe('ProdXBloqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdXBloqueService = TestBed.get(ProdXBloqueService);
    expect(service).toBeTruthy();
  });
});
