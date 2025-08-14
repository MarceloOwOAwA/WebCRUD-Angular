import { Routes } from '@angular/router';
import { Registro } from './registro/registro';
import { Login } from './login/login';
import { DeleteAccount } from './deleteaccount/deleteaccount';

export const routes: Routes = [
   {path: 'registro', component: Registro},
   {path: 'login', component: Login},
   {path: 'deleteaccount', component: DeleteAccount}
];
