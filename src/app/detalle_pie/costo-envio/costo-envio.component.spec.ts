import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoEnvioComponent } from './costo-envio.component';

describe('CostoEnvioComponent', () => {
  let component: CostoEnvioComponent;
  let fixture: ComponentFixture<CostoEnvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoEnvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
