import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApprovelComponent } from './pending-approvel.component';

describe('PendingApprovelComponent', () => {
  let component: PendingApprovelComponent;
  let fixture: ComponentFixture<PendingApprovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingApprovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingApprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
