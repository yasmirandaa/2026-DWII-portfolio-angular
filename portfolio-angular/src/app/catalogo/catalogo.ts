import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProjetoService } from '../tecnologia.service';

@Component({
  selector: 'app-catalogo',
  imports: [
    MatCardModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './catalogo.html'
})
export class Catalogo {
  private service = inject(ProjetoService);

  tecnologias$ = this.service.listar();
}