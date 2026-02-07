import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleAMALLData } from './circle-amalldata';

describe('CircleAMALLData', () => {
  let component: CircleAMALLData;
  let fixture: ComponentFixture<CircleAMALLData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleAMALLData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleAMALLData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
