import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { catchError, finalize, of } from 'rxjs';
import { ProjetoService, Projeto } from '../projeto.service';

@Component({
  selector: 'app-projetos',
  imports: [
    MatCardModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './projetos.html'
})
export class Projetos {
  private service = inject(ProjetoService);

  carregando = true;
  erro = '';

  projetos$ = this.service.listar().pipe(
    catchError(() => {
      this.erro = 'Falha ao carregar os projetos.';
      return of([] as Projeto[]);
    }),
    finalize(() => {
      this.carregando = false;
    })
  );
}