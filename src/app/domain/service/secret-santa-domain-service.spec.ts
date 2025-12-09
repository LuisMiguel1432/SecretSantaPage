import { TestBed } from '@angular/core/testing';

import { SecretSantaDomainService } from './secret-santa-domain-service';

describe('SecretSantaDomainService', () => {
  let service: SecretSantaDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretSantaDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
