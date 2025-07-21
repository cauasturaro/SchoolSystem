import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  imports: [FormsModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students {

  constructor(private router: Router) {}

  searchStudent: string = '';

  students: Student[] = [
    { id: 1, name: 'Cauã Sales Sturaro', age: 18, email: 'sturaro.contato@gmail.com', course: 'ADS' },
    { id: 2, name: 'Maria Sobrenome Outro', age: 22, email: 'maria@gmail.com', course: 'Engenharia de Produção' }
  ];

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

  editStudent(id: number) {
    // DESCOBRIR COMO FAZER FUNCIONAR:
    // this.router.navigate(['/students/', id]);
  }

}
