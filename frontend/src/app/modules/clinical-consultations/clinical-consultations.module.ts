import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicalConsultationsRoutingModule } from './clinical-consultations-routing.module';
import { SearchConsultationComponent } from './search-consultation/search-consultation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClinicalConsultationComponent } from './clinical-consultation.component';


@NgModule({
  declarations: [
    ClinicalConsultationComponent,
    SearchConsultationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClinicalConsultationsRoutingModule
  ]
})
export class ClinicalConsultationsModule { }
