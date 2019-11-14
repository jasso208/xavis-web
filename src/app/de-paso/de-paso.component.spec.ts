import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DePasoComponent } from './de-paso.component';

describe('DePasoComponent', () => {
  let component: DePasoComponent;
  let fixture: ComponentFixture<DePasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DePasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DePasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
