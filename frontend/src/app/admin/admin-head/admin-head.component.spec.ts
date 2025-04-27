import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeadComponent } from './admin-head.component';

describe('AdminHeadComponent', () => {
  let component: AdminHeadComponent;
  let fixture: ComponentFixture<AdminHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
