import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixMapComponent } from './fix-map.component';

describe('FixMapComponent', () => {
  let component: FixMapComponent;
  let fixture: ComponentFixture<FixMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
