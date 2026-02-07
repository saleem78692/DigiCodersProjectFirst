import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Branchlogin } from './branchlogin';

describe('Branchlogin', () => {
  let component: Branchlogin;
  let fixture: ComponentFixture<Branchlogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Branchlogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Branchlogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
