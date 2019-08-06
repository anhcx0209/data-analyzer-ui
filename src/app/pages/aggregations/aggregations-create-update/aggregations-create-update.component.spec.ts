import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationsCreateUpdateComponent } from './aggregations-create-update.component';

describe('AggregationsCreateUpdateComponent', () => {
  let component: AggregationsCreateUpdateComponent;
  let fixture: ComponentFixture<AggregationsCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationsCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationsCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
