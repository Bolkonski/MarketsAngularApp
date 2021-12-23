import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDeleteComponent } from './market-delete.component';

describe('MarketDeleteComponent', () => {
  let component: MarketDeleteComponent;
  let fixture: ComponentFixture<MarketDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
