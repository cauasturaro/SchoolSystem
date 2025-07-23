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

interface Subject {
  id:number;
  name: string;
  teacherName: string;
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
  selector: 'app-grade-card',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './grade-card.html',
  styleUrl: './grade-card.css'
})
export class GradeCard{

  private http = inject(HttpClient);

  @Input() grade!: Grade;
  @Input() subjectName!: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  onCancel() {
    this.changed.emit(); //to erase changes that were made
    this.cancel.emit();
  }

  saveChanges() {
    if (!this.grade?.id) return;

    this.http.put<Grade>(
      `http://localhost:8080/api/grades/${this.grade.id}`,
      this.grade 
    ).subscribe({
      next: (data) => {
        console.log('[SS API update]:', data);
        this.cancel.emit();
      },
      error: (err) => {
        console.error('Error updating grade', err);
      }
    });
  }

  deleteGrade() {
    if (!this.grade?.id) return;

    this.http.delete<void>(
      `http://localhost:8080/api/grades/${this.grade.id}`
    ).subscribe({
      next: () => {
        console.log('[SS API delete]: Grade deleted successfully.');
        this.changed.emit();
      },
      error: (err) => {
        console.error('Error deleting grade', err);
      }
    });
  }
}
