import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCard } from './subject-card';

describe('SubjectCard', () => {
  let component: SubjectCard;
  let fixture: ComponentFixture<SubjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
