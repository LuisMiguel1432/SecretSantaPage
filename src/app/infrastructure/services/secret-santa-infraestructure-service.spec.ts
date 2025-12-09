import { TestBed } from '@angular/core/testing';

import { SecretSantaInfraestructureService } from './secret-santa-infraestructure-service';

describe('SecretSantaInfraestructureService', () => {
  let service: SecretSantaInfraestructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretSantaInfraestructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
