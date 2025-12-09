import { TestBed } from '@angular/core/testing';

import { GroupStateService } from './group-state-service';

describe('GroupStateService', () => {
  let service: GroupStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
