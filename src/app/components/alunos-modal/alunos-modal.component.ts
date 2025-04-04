import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Aluno } from '../../services/aluno.service';
import { Curso } from '../../services/curso.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alunos-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './alunos-modal.component.html',
  styleUrls: ['./alunos-modal.component.css']
})
export class AlunosModalComponent {
  @Input() alunos: Aluno[] = [];
  @Output() fechar = new EventEmitter<void>();

  onClose() {
    this.fechar.emit();
  }

  formatarCursos(cursos?: Curso[]): string {
    return cursos?.map(c => c.nome).join(', ') || '';
  }


}
