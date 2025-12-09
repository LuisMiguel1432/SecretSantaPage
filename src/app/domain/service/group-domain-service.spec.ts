import { TestBed } from '@angular/core/testing';

import { GroupDomainService } from './group-domain-service';

describe('GroupDomainService', () => {
  let service: GroupDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
