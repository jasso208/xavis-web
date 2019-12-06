import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVentasTokenComponent } from './consulta-ventas-token.component';

describe('ConsultaVentasTokenComponent', () => {
  let component: ConsultaVentasTokenComponent;
  let fixture: ComponentFixture<ConsultaVentasTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaVentasTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaVentasTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
