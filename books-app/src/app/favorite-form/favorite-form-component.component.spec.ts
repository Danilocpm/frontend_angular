import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFormComponent } from './favorite-form.component';

describe('FavoriteFormComponentComponent', () => {
  let component: FavoriteFormComponent;
  let fixture: ComponentFixture<FavoriteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
