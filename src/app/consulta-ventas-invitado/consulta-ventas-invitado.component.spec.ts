import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVentasInvitadoComponent } from './consulta-ventas-invitado.component';

describe('ConsultaVentasInvitadoComponent', () => {
  let component: ConsultaVentasInvitadoComponent;
  let fixture: ComponentFixture<ConsultaVentasInvitadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaVentasInvitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaVentasInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
