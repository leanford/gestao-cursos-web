import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-alunos',
  standalone: true,
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule
  ]
})
export class AlunosComponent {

  isMobile: boolean = window.innerWidth < 410;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 410;
  }

  displayedColumns: string[] = ['nome', 'curso', 'acoes'];

  alunos = [
    { nome: 'Carlos', curso: 'Engenharia de Software' },
    { nome: 'Mariana', curso: 'Ciência da Computação' },
    { nome: 'João', curso: 'Sistemas de Informação' }
  ];

  cursos = ['Engenharia de Software', 'Ciência da Computação', 'Sistemas de Informação'];

  nome = '';
  curso = '';
  filtroNome = '';
  filtroCurso = '';

  adicionarAluno() {
    if (this.nome.trim() && this.curso.trim()) {
      this.alunos.push({ nome: this.nome, curso: this.curso });
      this.nome = '';
      this.curso = '';
    }
  }

  deletarAluno(index: number) {
    this.alunos.splice(index, 1);
  }

  get alunosFiltrados() {
    return this.alunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(this.filtroNome.toLowerCase()) &&
      aluno.curso.toLowerCase().includes(this.filtroCurso.toLowerCase())
    );
  }
}
