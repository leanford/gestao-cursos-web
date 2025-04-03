
import { Routes } from '@angular/router';
import { CursosComponent } from './cursos/cursos.component';
import { AlunosComponent } from './alunos/alunos.component';

export const routes: Routes = [
  { path: 'cursos', component: CursosComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: '', redirectTo: '/cursos', pathMatch: 'full' }
];
