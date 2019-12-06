import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaDevolucionComponent } from './politica-devolucion.component';

describe('PoliticaDevolucionComponent', () => {
  let component: PoliticaDevolucionComponent;
  let fixture: ComponentFixture<PoliticaDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
