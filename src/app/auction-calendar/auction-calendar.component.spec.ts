import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCalendarComponent } from './auction-calendar.component';

describe('AuctionCalendarComponent', () => {
  let component: AuctionCalendarComponent;
  let fixture: ComponentFixture<AuctionCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
