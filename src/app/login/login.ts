import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HttpClientModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  regForm!: ReturnType<FormBuilder['group']>;
  mensaje: string = '';
  tipoMensaje: 'success' | 'danger' | '' = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.regForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.regForm.invalid) {
      this.mensaje = 'Faltan campos o datos inválidos';
      this.tipoMensaje = 'danger';
      return;
    }

    const { email, password } = this.regForm.value;
    const body = { email, password };
    const url = 'http://localhost:8000/user/login';

    this.http.post(url, body).subscribe({
      next: (respuesta: any) => {
        // Guardar token en localStorage
        if (respuesta.token) {
          localStorage.setItem('authToken', respuesta.token);
        }

       this.mensaje = `Bienvenido ${respuesta.name}<br>
        ID: ${respuesta.id}<br>
        Email: ${respuesta.email}<br>
        Teléfonos: ${JSON.stringify(respuesta.phones)}<br>
        Último login: ${respuesta.last_login}<br>
        Modificado: ${respuesta.modified}<br>
        Creado: ${respuesta.created}<br>
        Token: ${respuesta.token} ✔<br><br>
        Estos datos son proporcionados por la API de gestión CRUD de usuarios. 
        El token de autenticación se almacena temporalmente en el LocalStorage, 
        con una vigencia de 15 minutos, garantizando así un manejo seguro y controlado 
        del acceso a la aplicación.`;
        this.tipoMensaje = 'success';

        this.regForm.reset();
      },
      error: (err: any) => {
        console.error(err);
        this.mensaje = err.error?.detail || 'Email o contraseña incorrectos';
        this.tipoMensaje = 'danger';
      }
    });
  }
}
