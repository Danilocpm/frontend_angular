import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBooksComponent } from './review-books.component';

describe('ReviewBooksComponent', () => {
  let component: ReviewBooksComponent;
  let fixture: ComponentFixture<ReviewBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
