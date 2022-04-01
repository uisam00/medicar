import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard';
import { ClinicalConsultationComponent } from './clinical-consultation.component';
import { SearchConsultationComponent } from './search-consultation/search-consultation.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicalConsultationComponent,
    children: [
      {
        path: '', canActivate: [AuthGuard], component: SearchConsultationComponent,
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicalConsultationsRoutingModule { }
