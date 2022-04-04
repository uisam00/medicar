import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicalConsultationsRoutingModule } from './clinical-consultations-routing.module';
import { SearchConsultationComponent } from './search-consultation/search-consultation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClinicalConsultationComponent } from './clinical-consultation.component';
import { NewConsultationComponent } from './new-consultation/new-consultation.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { CustomPaginator } from 'src/app/shared/provides/mat-paginator-intl';
@NgModule({
  declarations: [
    ClinicalConsultationComponent,
    SearchConsultationComponent,
    NewConsultationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClinicalConsultationsRoutingModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class ClinicalConsultationsModule { }
