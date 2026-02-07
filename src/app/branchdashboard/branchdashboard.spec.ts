import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Branchdashboard } from './branchdashboard';

describe('Branchdashboard', () => {
  let component: Branchdashboard;
  let fixture: ComponentFixture<Branchdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Branchdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Branchdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
