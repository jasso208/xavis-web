import { TestBed } from '@angular/core/testing';

import { DetalleProductoService } from './detalle-producto.service';

describe('DetalleProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetalleProductoService = TestBed.get(DetalleProductoService);
    expect(service).toBeTruthy();
  });
});
