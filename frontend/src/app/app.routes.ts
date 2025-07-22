import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Students } from './pages/students/students';
import { StudentCard } from './components/student-card/student-card';

export const routes: Routes = [
    {path: '', component: Home },
    {path: 'students', component: Students },
    {path: 'student', component: StudentCard }

];
