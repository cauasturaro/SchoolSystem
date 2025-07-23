import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Students } from './pages/students/students';
import { StudentCard } from './components/student-card/student-card';
import { GradeCard } from './components/grade-card/grade-card';

export const routes: Routes = [
    {path: '', component: Home },
    {path: 'students', component: Students },
    {path: 'student', component: StudentCard },
    {path: 'grade', component: GradeCard}

];
