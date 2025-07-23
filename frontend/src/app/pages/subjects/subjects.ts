import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StudentCard } from '../../components/student-card/student-card';
import { AddSubject } from '../../components/add-subject/add-subject';
import { SubjectCard } from '../../components/subject-card/subject-card';

interface Subject {
  id:number;
  name: string;
  teacherName: string;
  course: string;
}

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SubjectCard, AddSubject],
  templateUrl: './subjects.html',
  styleUrls: ['./subjects.css']
})
export class Subjects implements OnInit {

  showSubjectCard: boolean = false;
  showAddSubjectCard: boolean = false;

  private http = inject(HttpClient);
  private router = inject(Router);

  searchSubject: string = '';
  subjects: Subject[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
  this.http.get<Subject[]>('http://localhost:8080/api/subjects')
    .subscribe({
      next: (data) => {
        console.log('[SS API data]:', data);
        this.subjects = data;
      },
      error: (error) => {
        console.error('Error trying to fetch for subjects', error);
      }
    });
  }

  filteredSubjects(): Subject[] {
    if (!this.searchSubject) return this.subjects;

    const search = this.searchSubject.toLowerCase();

    return this.subjects.filter(subject =>
      String(subject.id).includes(search) ||
      subject.name.toLowerCase().includes(search) ||
      subject.teacherName.toLowerCase().includes(search) ||
      subject.course.toLowerCase().includes(search)
    );
  }

  onCancel() {
    this.showSubjectCard = false;
  }

  onCancelSubjectCreate() {
    this.showAddSubjectCard = false;
  }

  onChanged() {
    this.fetchData();
    this.onCancel();
    this.onCancelSubjectCreate();
  }

  selectedSubject!: Subject;

  editSubject(subject: Subject) {
    this.selectedSubject = subject;
    this.showSubjectCard = true;
  }

  createSubject() {
    this.showAddSubjectCard = true;
  }
}
