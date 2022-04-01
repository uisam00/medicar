import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConsultationComponent } from './search-consultation.component';

describe('SearchConsultationComponent', () => {
  let component: SearchConsultationComponent;
  let fixture: ComponentFixture<SearchConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
