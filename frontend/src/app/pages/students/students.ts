import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StudentCard } from '../../components/student-card/student-card';
import { AddStudent } from '../../components/add-student/add-student';

interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  course: string; 
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, StudentCard, AddStudent],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students implements OnInit {

  showStudentCard: boolean = false;
  showAddStudentCard: boolean = false;

  private http = inject(HttpClient);
  private router = inject(Router);

  searchStudent: string = '';
  students: Student[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
  this.http.get<Student[]>('http://localhost:8080/api/students')
    .subscribe({
      next: (data) => {
        console.log('[SS API data]:', data);
        this.students = data;
      },
      error: (err) => {
        console.error('Error trying to fetch for students', err);
      }
    });
  }

  filteredStudents(): Student[] {
    if (!this.searchStudent) return this.students;

    const search = this.searchStudent.toLowerCase();

    return this.students.filter(student =>
      String(student.id).includes(search) ||
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      student.course.toLowerCase().includes(search)
    );
  }

  onCancel() {
    this.showStudentCard = false;
  }

  onCancelStudentCreate() {
    this.showAddStudentCard = false;
  }

  onChanged() {
    this.fetchData();
    this.onCancel();
    this.onCancelStudentCreate();
  }

  selectedStudent!: Student;

  editStudent(student: Student) {
    this.selectedStudent = student;
    this.showStudentCard = true;
  }

  createStudent() {
    this.showAddStudentCard = true;
  }
}
