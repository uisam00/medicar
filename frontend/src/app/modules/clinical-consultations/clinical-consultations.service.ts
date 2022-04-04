import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/services/base.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ROUTES_CONSULTATION_API } from 'src/app/shared/models/constants';
import { Consultation } from 'src/app/shared/models/consultation';
import { Doctor } from 'src/app/shared/models/doctor';
import { NewConsultationRequest } from 'src/app/shared/models/new-consultation-request';
import { Schedule } from 'src/app/shared/models/schedule';
import { Specialty } from 'src/app/shared/models/specialty';

@Injectable({
  providedIn: 'root'
})
export class ClinicalConsultationsService extends BaseService  {
  constructor(
    protected notification: NotificationService,
    protected http: HttpClient,
    protected config: ConfigService) 
  { 
    super(notification, http, config)
  }

  getConsultations(): Promise<Consultation[] | undefined> {
    return this.http.get<Consultation[]>(this.urlApi + ROUTES_CONSULTATION_API.consultation).toPromise();
  }
  getSpecialties(): Promise<Specialty[] | undefined> {
    return this.http.get<Specialty[]>(this.urlApi + ROUTES_CONSULTATION_API.getSpecialties).toPromise();
  }
  getDoctorsBySpecialty(SpecialtyId: number): Promise<Doctor[] | undefined> {
    return this.http.get<Doctor[]>(this.urlApi + ROUTES_CONSULTATION_API.getDoctors + `?especialidade=${SpecialtyId}`).toPromise();
  }
  getSchedulesByDoctor(doctorId: number): Promise<Schedule[] | undefined> {
    return this.http.get<Schedule[]>(this.urlApi + ROUTES_CONSULTATION_API.getSchedules + `?medico=${doctorId}`).toPromise();
  }
  postConsultation(consultation: NewConsultationRequest): Promise<any | undefined> {
    return this.http.post<any>(this.urlApi + ROUTES_CONSULTATION_API.consultation, consultation).toPromise();
  }
  deleteConsultation(consultationId: number): Promise<any | undefined> {
    return this.http.delete<any>(this.urlApi + ROUTES_CONSULTATION_API.consultation + consultationId).toPromise();
  }
}
