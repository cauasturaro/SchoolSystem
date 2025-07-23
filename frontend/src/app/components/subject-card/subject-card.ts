import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GradeCard } from '../grade-card/grade-card';
import { AddGrade } from "../add-grade/add-grade";

interface Subject {
  id:number;
  name: string;
  teacherName: string;
  course: string;
}

@Component({
  selector: 'app-subject-card',
  standalone: true,
  imports: [HttpClientModule, FormsModule, GradeCard, AddGrade],
  templateUrl: './subject-card.html',
  styleUrls: ['./subject-card.css']
})
export class SubjectCard{

  private http = inject(HttpClient);

  @Input() subject!: Subject;
  @Output() cancel = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  onCancel() {
    this.changed.emit(); //to erase changes that were made
    this.cancel.emit();
  }

  saveChanges() {
    if (!this.subject?.id) return;

    this.http.put<Subject>(
      `http://localhost:8080/api/subjects/${this.subject.id}`,
      this.subject 
    ).subscribe({
      next: (data) => {
        console.log('[SS API update]:', data);
        this.changed.emit();
      },
      error: (error) => {
        console.error('Error updating student', error);
      }
    });
  }

  deleteSubject() {
    if (!this.subject?.id) return;

    this.http.delete<void>(
      `http://localhost:8080/api/subjects/${this.subject.id}`
    ).subscribe({
      next: () => {
        console.log('[SS API delete]: Subject deleted successfully.');
        this.changed.emit();
      },
      error: (err) => {
        console.error('Error deleting subject', err);
      }
    });
  }

}
