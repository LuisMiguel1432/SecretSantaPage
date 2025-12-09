import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInList } from './group-in-list';

describe('GroupInList', () => {
  let component: GroupInList;
  let fixture: ComponentFixture<GroupInList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupInList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupInList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
