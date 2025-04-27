import { TestBed } from '@angular/core/testing';

import { TableBookingService } from './table-booking.service';

describe('TableBookingService', () => {
  let service: TableBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
