import { Injectable } from '@angular/core';
import {Http,Response,URLSearchParams} from '@angular/http';
import{map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
describe('GuardaVentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardaVentaService = TestBed.get(GuardaVentaService);
    expect(service).toBeTruthy();
  });
});
