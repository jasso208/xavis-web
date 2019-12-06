import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVentasValidaTokenComponent } from './consulta-ventas-valida-token.component';

describe('ConsultaVentasValidaTokenComponent', () => {
  let component: ConsultaVentasValidaTokenComponent;
  let fixture: ComponentFixture<ConsultaVentasValidaTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaVentasValidaTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaVentasValidaTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
