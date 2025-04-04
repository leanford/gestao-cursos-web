import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './curso.service';
import { environment } from '../../environments/environment';

export interface Aluno {
  id?: number;
  nome: string;
  cursos: Curso[];
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private readonly apiUrl = environment.apiUrl + '/alunos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  criar(aluno: Aluno): Observable<void> {
    return this.http.post<void>(this.apiUrl, aluno);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
