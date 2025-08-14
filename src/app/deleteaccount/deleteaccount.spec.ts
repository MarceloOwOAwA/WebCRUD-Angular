import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleteaccount } from './deleteaccount';

describe('Deleteaccount', () => {
  let component: Deleteaccount;
  let fixture: ComponentFixture<Deleteaccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleteaccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deleteaccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
