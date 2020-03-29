import { TestBed } from '@angular/core/testing';

import { PasoParamBuscarService } from './paso-param-buscar.service';

describe('PasoParamBuscarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasoParamBuscarService = TestBed.get(PasoParamBuscarService);
    expect(service).toBeTruthy();
  });
});
