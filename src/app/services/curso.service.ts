import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from './aluno.service';
import { environment } from '../../environments/environment';

export interface Curso {
    id: number;
    nome: string;
}

@Injectable({
    providedIn: 'root'
})
export class CursoService {
    private readonly apiUrl = environment.apiUrl + '/cursos';

    constructor(private http: HttpClient) { }

    listarSemTrazerAlunos(): Observable<Curso[]> {
        return this.http.get<Curso[]>(`${this.apiUrl}`);
    }

    buscarAlunosDoCurso(cursoId: number): Observable<Aluno[]> {
        return this.http.get<Aluno[]>(`${this.apiUrl}/${cursoId}/alunos`);
    }

    criar(curso: { nome: string }): Observable<void> {
        return this.http.post<void>(this.apiUrl, curso);
    }

    deletar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
