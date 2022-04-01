import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from './core/guards/public-guard';
import { CreateAccountComponent } from './modules/authentication/create-account/create-account.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '',canActivate: [PublicGuard],  component: LoginComponent },
  { path: 'login', canActivate: [PublicGuard], component: LoginComponent },
  { path: 'cadastrar',canActivate: [PublicGuard],  component: CreateAccountComponent },
  { path: 'consultas', loadChildren: () => import('./modules/clinical-consultations/clinical-consultations.module').then(m => m.ClinicalConsultationsModule) },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
