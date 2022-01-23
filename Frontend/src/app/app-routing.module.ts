import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPageComponent } from './components/client-page/client-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ManagerPageComponent } from './components/manager-page/manager-page.component';

const routes: Routes = [
  {
    component: ManagerPageComponent,
    path: '',
  },
  {
    component: LoginPageComponent,
    path: 'login',
  },
  {
    component: ClientPageComponent,
    path: 'client',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
