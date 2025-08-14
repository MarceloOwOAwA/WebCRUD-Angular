import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deleteaccount',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './deleteaccount.html',
  styleUrl: './deleteaccount.css'
})
export class DeleteAccount implements OnInit {
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

    // Extraer token del localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.mensaje = 'No hay token en el sistema. Inicie sesión nuevamente.';
      this.tipoMensaje = 'danger';
      return;
    }

    // Payload en el formato exacto que requiere la API
    const payload = {
      email: email,
      password: password,
      token: token
    };

    // Mostrar en consola el payload antes de enviarlo
    console.log('Payload que se enviará a la API:', payload);

    const url = 'http://localhost:8000/user/borrar_usuario';

    this.http.post(url, payload).subscribe({
      next: (respuesta: any) => {
        this.mensaje = respuesta.message || 'Operación completada correctamente ✔';
        this.tipoMensaje = 'success';

        // Borrar token del localStorage después de eliminar usuario
        localStorage.removeItem('authToken');

        this.regForm.reset();
      },
      error: (err: any) => {
        console.error(err);
        this.mensaje = err.error?.detail || 'Error al eliminar usuario';
        this.tipoMensaje = 'danger';
      }
    });
  }
}
