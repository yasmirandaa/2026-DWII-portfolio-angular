import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private http = inject(HttpClient);
  private router = inject(Router);

  loginForm;

  mensagemErro = '';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  entrar() {

    console.log('BOTÃO CLICADO');

    if (this.loginForm.invalid) {
      console.log('FORMULÁRIO INVÁLIDO');
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('FORMULÁRIO VÁLIDO');

    this.mensagemErro = '';

    const dados = {
      email: this.loginForm.value.email,
      senha: this.loginForm.value.senha
    };

    this.http.post<any>(
      'https://improved-yodel-r49xpxvq99jwcwx64-8000.app.github.dev/api/login.php',
      dados
      ).subscribe({

      next: (resposta) => {

        console.log('Resposta do PHP:', resposta);

        if (resposta.sucesso) {

          console.log('Login realizado!');

          this.router.navigate(['/gestao']);

        } else {

          this.mensagemErro =
            resposta.mensagem || 'E-mail ou senha inválidos.';

        }

      },

      error: (erro) => {

        console.error('Erro no login:', erro);

        this.mensagemErro =
          'Não foi possível conectar ao servidor.';

      }

    });
  }
}

