import { TestBed } from '@angular/core/testing';

import { EnviaTokenService } from './envia-token.service';

describe('EnviaTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviaTokenService = TestBed.get(EnviaTokenService);
    expect(service).toBeTruthy();
  });
});
