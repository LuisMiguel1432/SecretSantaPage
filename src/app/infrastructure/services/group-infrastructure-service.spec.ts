import { TestBed } from '@angular/core/testing';

import { GroupInfrastructureService } from './group-infrastructure-service';

describe('GroupInfrastructureService', () => {
  let service: GroupInfrastructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupInfrastructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
