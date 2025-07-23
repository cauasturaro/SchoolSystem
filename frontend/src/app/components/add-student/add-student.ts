import { Component, EventEmitter, Output, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Student {
  id?: number;
  name: string;
  age?: number;
  email: string;
  course: string;
}

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css'
})
export class AddStudent{

  private http = inject(HttpClient);

  @Output() cancel = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  onCancel() {
    this.changed.emit(); //to erase changes that were made
    this.cancel.emit();
  }

  student: Student = {
    id: 0,
    name: '',
    age: undefined,
    email: '',
    course: ''
  };


  createStudent() {
    const studentToCreate = { ...this.student };
    delete studentToCreate.id;

    this.http.post<Student>(
      'http://localhost:8080/api/students',
      studentToCreate
    ).subscribe({
      next: (data) => {
        console.log('[SS API create]: Student created:', data);
        this.changed.emit(); 
      },
      error: (err) => {
        console.error('Error creating student:', err);
      }
    });
  }




}
