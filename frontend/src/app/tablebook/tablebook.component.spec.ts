import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablebookComponent } from './tablebook.component';

describe('TablebookComponent', () => {
  let component: TablebookComponent;
  let fixture: ComponentFixture<TablebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
