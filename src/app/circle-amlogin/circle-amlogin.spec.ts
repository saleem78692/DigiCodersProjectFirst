import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleAMLogin } from './circle-amlogin';

describe('CircleAMLogin', () => {
  let component: CircleAMLogin;
  let fixture: ComponentFixture<CircleAMLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleAMLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleAMLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
