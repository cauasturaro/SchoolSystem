import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Students } from './pages/students/students';

export const routes: Routes = [
    {path: '', component: Home },
    {path: 'students', component: Students }
];
