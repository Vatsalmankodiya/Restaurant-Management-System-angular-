import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBookingHistoryComponent } from './table-booking-history.component';

describe('TableBookingHistoryComponent', () => {
  let component: TableBookingHistoryComponent;
  let fixture: ComponentFixture<TableBookingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBookingHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
