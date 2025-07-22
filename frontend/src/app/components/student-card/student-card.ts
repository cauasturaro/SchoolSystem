import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  course: string;
}

interface Grade {
  id: number;
  studentId: number;
  subjectId: number;
  value: number;
  course: string;
}

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css'
})
export class StudentCard {

  private http = inject(HttpClient);

  @Input() student!: Student;
  @Output() cancel = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  onCancel() {
    this.changed.emit(); //to erase changes that were made
    this.cancel.emit();
  }

  saveChanges() {
    if (!this.student?.id) return;

    this.http.put<Student>(
      `http://localhost:8080/api/students/${this.student.id}`,
      this.student 
    ).subscribe({
      next: (data) => {
        console.log('[SS API update]:', data);
        this.changed.emit();
      },
      error: (err) => {
        console.error('Error updating student', err);
      }
    });
  }

  deleteStudent() {
    if (!this.student?.id) return;

    this.http.delete<void>(
      `http://localhost:8080/api/students/${this.student.id}`
    ).subscribe({
      next: () => {
        console.log('[SS API delete]: Student deleted successfully.');
        this.changed.emit();
      },
      error: (err) => {
        console.error('Error deleting student', err);
      }
    });
  }

  searchGrade: string = '';
  grades: Grade[] = [];

}
