import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleAMDashboard } from './circle-amdashboard';

describe('CircleAMDashboard', () => {
  let component: CircleAMDashboard;
  let fixture: ComponentFixture<CircleAMDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleAMDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleAMDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
