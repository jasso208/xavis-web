import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVentasGridComponent } from './consulta-ventas-grid.component';

describe('ConsultaVentasGridComponent', () => {
  let component: ConsultaVentasGridComponent;
  let fixture: ComponentFixture<ConsultaVentasGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaVentasGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaVentasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
