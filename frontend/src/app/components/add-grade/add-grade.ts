import { Component, EventEmitter, Input, Output, inject, SimpleChanges, OnChanges } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Grade {
  id?: number;
  studentId?: number;
  subjectId?: number;
  value?: number;
  course: string;
}

interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  course: string;
}

@Component({
  selector: 'app-add-grade',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './add-grade.html',
  styleUrl: './add-grade.css'
})
export class AddGrade implements OnChanges {

  private http = inject(HttpClient);

  @Input() student!: Student;
  @Output() cancel = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  grade: Grade = {
    studentId: undefined,
    subjectId: undefined,
    value: undefined,
    course: '',
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student']) {
      this.grade.studentId = this.student.id;
      this.grade.course = this.student.course;
    }
  }

  onCancel() {
    this.changed.emit();
    this.cancel.emit();
  }

  createGrade() {
    const gradeToCreate = { ...this.grade };
    delete gradeToCreate.id;

    this.http.post<Grade>(
      'http://localhost:8080/api/grades',
      gradeToCreate
    ).subscribe({
      next: (data) => {
        console.log('[SS API create]: Grade created:', data);
        this.changed.emit(); 
        this.cancel.emit();
      },
      error: (error) => {
        console.error('[SS Error creating grade]', error);
      }
    });
  }
}
