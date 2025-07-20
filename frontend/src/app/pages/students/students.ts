import { Component } from '@angular/core';

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
  imports: [],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {
  students: Student[] = [
    {
      id: 1,
      name: 'João',
      age: 20,
      email: 'joão@gmail.com',
      course: 'Mathematics'
    },
    {
      id: 2,
      name: 'Maria',
      age: 22,
      email: 'maria@gmail.com',
      course: 'ADS'
    }
  ];
}
