import { Component, EventEmitter, Output, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Subject {
  id?:number;
  name: string;
  teacherName: string;
  course: string;
}

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './add-subject.html',
  styleUrl: './add-subject.css'
})
export class AddSubject{

  private http = inject(HttpClient);

  @Output() cancel = new EventEmitter<void>();
  @Output() changed = new EventEmitter<void>();

  onCancel() {
    this.changed.emit(); //to erase changes that were made
    this.cancel.emit();
  }

  subject: Subject = {
    id: 0,
    name: '',
    teacherName: '',
    course: ''
  };

  createSubject() {
    const subjectToCreate = { ...this.subject };
    delete subjectToCreate.id;

    this.http.post<Subject>(
      'http://localhost:8080/api/subjects',
      subjectToCreate
    ).subscribe({
      next: (data) => {
        console.log('[SS API create]: Subject created:', data);
        this.changed.emit(); 
      },
      error: (error) => {
        console.error('Error creating subject:', error);
      }
    });
  }

}
