import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreation } from './group-creation';

describe('GroupCreation', () => {
  let component: GroupCreation;
  let fixture: ComponentFixture<GroupCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
