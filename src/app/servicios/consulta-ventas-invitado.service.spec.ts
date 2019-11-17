import { TestBed } from '@angular/core/testing';

import { ConsultaVentasInvitadoService } from './consulta-ventas-invitado.service';

describe('ConsultaVentasInvitadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaVentasInvitadoService = TestBed.get(ConsultaVentasInvitadoService);
    expect(service).toBeTruthy();
  });
});
