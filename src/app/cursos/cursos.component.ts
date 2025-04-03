import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cursos',
  standalone: true,
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ]
})
export class CursosComponent {
  displayedColumns: string[] = ['nome', 'acoes'];

  cursos = [
    { nome: 'Engenharia de Software' },
    { nome: 'Ciência da Computação' },
    { nome: 'Sistemas de Informação' }
  ];

  nomeCurso = '';

  adicionarCurso() {
    if (this.nomeCurso.trim()) {
      this.cursos.push({ nome: this.nomeCurso });
      this.nomeCurso = '';
    }
  }

  deletarCurso(index: number) {
    this.cursos.splice(index, 1);
  }

  visualizarAlunos(curso: any) {
    console.log(`Exibir alunos do curso: ${curso.nome}`);
  }
}
