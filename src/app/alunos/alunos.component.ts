import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AlunoService, Aluno } from '../services/aluno.service';
import { CursoService, Curso } from '../services/curso.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';

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
    MatSelectModule,
    ConfirmModalComponent
  ]
})
export class AlunosComponent implements OnInit {

  alunos: Aluno[] = [];
  nome = '';
  curso = '';
  cursos: Curso[] = [];
  cursosSelecionados: Curso[] = [];
  filtroNome = '';
  filtroCurso = '';
  mostrarConfirmacaoAdicaoAluno = false;
  mostrarConfirmacaoRemocaoAluno = false;
  alunoParaAdicionar: Aluno | null = null;
  alunoParaRemover: Aluno | null = null;

  isMobile: boolean = window.innerWidth < 410;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 410;
  }

  displayedColumns: string[] = ['nome', 'curso', 'acoes'];

  constructor(
    private alunoService: AlunoService,
    private cursoService: CursoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.carregarAlunos();
    this.carregarCursos();
  }

  carregarAlunos(): void {
    this.alunoService.listar().subscribe({
      next: (dados) => this.alunos = dados,
      error: (err) => console.error('Erro ao carregar alunos', err)
    });
  }

  carregarCursos(): void {
    this.cursoService.listarSemTrazerAlunos().subscribe({
      next: (dados) => this.cursos = dados,
      error: (err) => console.error('Erro ao carregar cursos', err)
    });
  }

  verificarCursos(): void {
    if (this.cursos.length === 0) {
      this.toastr.warning('Primeiro crie um curso!', 'Nenhum curso disponível no momento.');
    }
  }

  confirmarAdicaoAluno(): void {
    if (!this.alunoParaAdicionar) return;

    this.alunoService.criar(this.alunoParaAdicionar).subscribe({
      next: () => {
        this.carregarAlunos();
        this.nome = '';
        this.cursosSelecionados = [];
        this.toastr.success('Aluno adicionado com sucesso!', 'Adicionado com sucesso!');
      },
      error: (err) => console.error('Erro ao criar aluno', err)
    });

    this.alunoParaAdicionar = null;
    this.mostrarConfirmacaoAdicaoAluno = false;
  }

  adicionarAluno(): void {
    const nomeTrimmed = this.nome.trim();

    if (nomeTrimmed && this.cursosSelecionados.length > 0) {
      this.alunoParaAdicionar = { nome: nomeTrimmed, cursos: this.cursosSelecionados };
      this.mostrarConfirmacaoAdicaoAluno = true;
    } else {
      this.toastr.warning('Digite o nome do aluno e selecione pelo menos um curso!', 'Atenção!');
    }
  }

  confirmarRemocaoAluno(): void {
    if (!this.alunoParaRemover?.id) return;

    this.alunoService.deletar(this.alunoParaRemover.id).subscribe({
      next: () => {
        this.toastr.success('Aluno removido com sucesso!', 'Removido com sucesso!');
        this.carregarAlunos();
      },
      error: (err) => console.error('Erro ao deletar aluno', err)
    });

    this.alunoParaRemover = null;
    this.mostrarConfirmacaoRemocaoAluno = false;
  }

  deletarAluno(index: number): void {
    const aluno = this.alunosFiltrados[index];
    if (aluno?.id) {
      this.alunoParaRemover = aluno;
      this.mostrarConfirmacaoRemocaoAluno = true;
    }
  }


  get alunosFiltrados() {
    return this.alunos.filter(aluno =>
      (aluno.nome?.toLowerCase() ?? '').includes(this.filtroNome.toLowerCase()) &&
      (aluno.cursos?.map(c => c.nome.toLowerCase()).join(', ') ?? '').includes(this.filtroCurso.toLowerCase())
    );
  }

  formatarCursos(cursos?: Curso[]): string {
    return cursos?.map(c => c.nome).join(', ') || '';
  }


}
