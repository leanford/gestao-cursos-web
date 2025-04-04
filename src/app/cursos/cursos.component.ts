import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CursoService, Curso } from '../services/curso.service';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from '../services/aluno.service';
import { AlunosModalComponent } from '../components/alunos-modal/alunos-modal.component';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';

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
    MatCardModule,
    MatTooltipModule,
    AlunosModalComponent,
    ConfirmModalComponent
  ]
})
export class CursosComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'acoes'];
  cursos: Curso[] = [];
  nomeCurso = '';
  mostrarConfirmacaoAdicao: boolean = false;
  cursoParaAdicionar: string = '';
  alunosVisiveis: Aluno[] | null = null;
  mostrarConfirmacaoDelete: boolean = false;
  cursoParaDeletar: { id: number, nome: string } | null = null;

  constructor(private cursoService: CursoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregarCursos();
  }

  carregarCursos(): void {
    this.cursoService.listarSemTrazerAlunos().subscribe({
      next: (dados) => this.cursos = dados,
      error: (err) => console.error('Erro ao carregar cursos', err)
    });
  }

  adicionarCurso(): void {
    const nomeTrimmed = this.nomeCurso.trim();

    if (nomeTrimmed) {
      this.cursoParaAdicionar = nomeTrimmed;
      this.mostrarConfirmacaoAdicao = true;
    } else {
      this.toastr.warning('Digite o nome do curso!', 'Atenção!');
    }
  }

  confirmarAdicaoCurso(): void {
    const novoCurso = { nome: this.cursoParaAdicionar };

    this.cursoService.criar(novoCurso).subscribe({
      next: () => {
        this.carregarCursos();
        this.nomeCurso = '';
        this.cursoParaAdicionar = '';
        this.toastr.success('Curso adicionado com sucesso!', 'Adicionado com sucesso!');
        this.mostrarConfirmacaoAdicao = false;
      },
      error: (err) => {
        console.error('Erro ao criar curso', err);
        this.toastr.error('Erro ao criar curso', 'Erro');
        this.mostrarConfirmacaoAdicao = false;
      }
    });
  }

  deletarCurso(index: number): void {
    const curso = this.cursos[index];
    if (curso?.id) {
      this.cursoParaDeletar = { id: curso.id, nome: curso.nome };
      this.mostrarConfirmacaoDelete = true;
    }
  }

  confirmarDeleteCurso(): void {
    if (this.cursoParaDeletar?.id) {
      this.cursoService.deletar(this.cursoParaDeletar.id).subscribe({
        next: () => {
          this.toastr.success('Curso removido com sucesso!', 'Removido com sucesso!');
          this.carregarCursos();
          this.mostrarConfirmacaoDelete = false;
          this.cursoParaDeletar = null;
        },
        error: (err) => {
          if (err.status === 409) {
            this.toastr.error(err.error, 'Não foi possível remover');
          } else {
            this.toastr.error('Erro ao tentar remover o curso.', 'Erro');
            console.error('Erro ao deletar curso', err);
          }
          this.mostrarConfirmacaoDelete = false;
          this.cursoParaDeletar = null;
        }
      });
    }
  }

  visualizarAlunos(curso: Curso): void {
    if (!curso.id) return;

    this.cursoService.buscarAlunosDoCurso(curso.id).subscribe({
      next: (alunos) => {
        this.alunosVisiveis = alunos;
      },
      error: (err) => {
        console.error('Erro ao buscar alunos do curso', err);
        this.toastr.error('Erro ao carregar alunos', 'Erro');
      }
    });
  }

  fecharModal(): void {
    this.alunosVisiveis = null;
  }

}
