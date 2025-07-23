import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCard } from './grade-card';

describe('GradeCard', () => {
  let component: GradeCard;
  let fixture: ComponentFixture<GradeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
