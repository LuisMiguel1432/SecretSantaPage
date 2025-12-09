import { TestBed } from '@angular/core/testing';

import { AuthInfraestructureService } from './auth-infrastructure-service';

describe('AuthService', () => {
  let service: AuthInfraestructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject( AuthInfraestructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
