import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GradeCard } from '../grade-card/grade-card';
import { AddGrade } from "../add-grade/add-grade";

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
  selector: 'app-student-card',
  standalone: true,
  imports: [HttpClientModule, FormsModule, GradeCard, AddGrade],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css'
})
export class StudentCard implements OnInit{

  private http = inject(HttpClient);

  @Input() student!: Student;
  @Output() cancel = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.student?.id) {
      this.fetchData();
    }
  }

  onCancel() {
    this.changed.emit(); //to erase changes that were made
    this.cancel.emit();
  }

  onCancelGrade() {
    this.showGradeCard = false;
  }
  onCancelAddGrade() {
    this.showAddGradeCard = false;
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
      error: (error) => {
        console.error('Error updating student', error);
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

  subjectMap = new Map<number, string>();

  fetchData() {
    this.http.get<Grade[]>(`http://localhost:8080/api/students/${this.student.id}/grades`)
      .subscribe({
        next: (data) => {
          console.log('[SS API data]:', data);
          this.grades = data;
          this.loadSubjects(data);
        },
        error: (err) => {
          console.error('Error trying to fetch for grades', err);
        }
    });
  }

  loadSubjects(grades: Grade[]) {
    const subjectIds = [...new Set(grades.map(g => g.subjectId))];

    subjectIds.forEach(id => {
    this.http.get<Subject>(`http://localhost:8080/api/subjects/${id}`)
      .subscribe({
        next: (subject) => {
          this.subjectMap.set(subject.id, subject.name.toLowerCase());
        }
      });
  });
  }

  filteredGrades(): Grade[] {
    if (!this.searchGrade) return this.grades;

    const search = this.searchGrade.toLowerCase();

    return this.grades.filter(grade =>
      String(grade.id).includes(search) ||
      this.subjectMap.get(grade.subjectId)?.includes(search)
    );
  }

  showGradeCard: boolean = false;
  showAddGradeCard: boolean = false;

  selectedGrade!: Grade;
  selectedSubject!: string

  editGrade(grade: Grade) {
    this.selectedGrade = grade;
    this.showGradeCard = true;
    this.selectedSubject = this.subjectMap.get(grade.subjectId) || "";
  }


  createGrade() {
    this.showAddGradeCard = true;
  }

  onChanged() {
    this.fetchData();
  }

}
