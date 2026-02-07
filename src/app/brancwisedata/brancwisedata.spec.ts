import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Brancwisedata } from './brancwisedata';

describe('Brancwisedata', () => {
  let component: Brancwisedata;
  let fixture: ComponentFixture<Brancwisedata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Brancwisedata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Brancwisedata);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
