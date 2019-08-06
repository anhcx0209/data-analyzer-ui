import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAddComponent } from './query-add.component';

describe('QueryAddComponent', () => {
  let component: QueryAddComponent;
  let fixture: ComponentFixture<QueryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
