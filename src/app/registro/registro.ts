import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro implements OnInit {
  regForm!: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.regForm = this.fb.group({
      name:        ['', [Validators.required, Validators.minLength(3)]],
      email:       ['', [Validators.required, Validators.email]],
      password:    ['', [Validators.required, Validators.minLength(8)]],
      countrycode: ['', [Validators.required, Validators.minLength(2)]],
      devicecode:  ['', [Validators.required, Validators.minLength(1)]],
      number:      ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
  if (this.regForm.invalid) {
    alert('Faltan campos o datos inválidos');
    return;
  }

  const { name, email, password, countrycode, devicecode, number } =
    this.regForm.value;

  // Build exactly the JSON your backend expects
  const body = {
    name,
    email,
    password,
    phones: [
      {
        number:      String(number),
        devicecode:  String(devicecode),
        countrycode: String(countrycode)
      }
    ],
    is_admin: false      // add if the API requires it
  };

  const url = 'http://localhost:8000/user/registro';
  this.http.post(url, body).subscribe({
    next: () => {
      alert('Usuario creado ✔');
      this.regForm.reset();
    },
    error: (err: any) => {
      console.error(err);
      alert('Error al crear usuario');
    }
  });
  }

}