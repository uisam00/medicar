import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Doctor } from 'src/app/shared/models/doctor';
import { NewConsultationRequest } from 'src/app/shared/models/new-consultation-request';
import { Schedule } from 'src/app/shared/models/schedule';
import { Specialty } from 'src/app/shared/models/specialty';
import { ClinicalConsultationsService } from '../clinical-consultations.service';

@Component({
  selector: 'app-new-consultation',
  templateUrl: './new-consultation.component.html',
  styleUrls: ['./new-consultation.component.scss']
})
export class NewConsultationComponent implements OnInit {
  specialties: Specialty[] = [];
  doctors: Doctor[] = [];
  schedules: Schedule[] = [];
  horary!: any[];

  form!: FormGroup; 

  get controls() { return this.form.controls; }
  
    constructor(
      private consuService: ClinicalConsultationsService, 
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<NewConsultationComponent>) { }

  ngOnInit(): void {
    this.createForm();
    this.getSpecialties()
  }
  
  createForm() {
    this.form = this.formBuilder.group({
      specialtyId: [null,],
      doctorId: [null,],
      scheduleId: [null ,  [Validators.required]],
      hour: ['', [Validators.required]]

    });
    this.disableAllForm();
  }

  disableAllForm(){
    this.controls['doctorId'].disable();
    this.controls['scheduleId'].disable();
    this.controls['hour'].disable();
  }

  getSpecialties() {    
    this.consuService.getSpecialties()
      .then(response => {
        this.consuService.handleResponse(response);
        if (response) {
          this.specialties = response;
          
        }
      });
  }

  onSelectSpecialty(){
    this.controls['doctorId'].setValue(null); 
    this.controls['scheduleId'].setValue(null); 
    this.controls['hour'].setValue(null); 
    this.disableAllForm();
    this.getDoctorsBySpecialty();
  }

  onSelectDoctor(){
    this.controls['scheduleId'].setValue(null); 
    this.controls['hour'].setValue(null); 
    this.controls['hour'].disable(); 
    this.getSchedulesByDoctor();
  }

  onSelectSchedule(){
    this.controls['hour'].setValue(null); 
    this.getHorary();
  }

  getHorary(){
    const scheduleId = this.controls['scheduleId'].value as number;

    if(this.schedules.length){
      const schedule =  this.schedules.find(x => x.id == scheduleId);
      if(schedule && schedule.horarios.length){
        this.horary = schedule.horarios;
        this.controls["hour"].enable();
      }else{
        this.controls["hour"].disable();

      }
    }
  }

  async getDoctorsBySpecialty() {
    const specialtyId = this.controls['specialtyId'].value as number;

    await this.consuService.getDoctorsBySpecialty(specialtyId)
      .then(response => {
        this.consuService.handleResponse(response);
        if (response) {

          this.doctors = response;
          // this.doctors = response.filter(x=> x.especialidade.id == specialtyId);
          if(this.doctors.length){
            this.controls["doctorId"].enable();
          }else{
            this.controls["doctorId"].disable();
            this.controls["scheduleId"].disable();
            this.controls["hour"].disable();
          }
        }
      });
  }

  getSchedulesByDoctor() {
    const doctorId = this.controls['doctorId'].value as number;

    this.consuService.getSchedulesByDoctor(doctorId)
      .then(response => {
        this.consuService.handleResponse(response);
        if (response) {
          this.schedules = response.filter(x=> x.medico.id == doctorId);
          if(this.schedules.length){
            this.controls["scheduleId"].enable();
          }else{
            this.controls["scheduleId"].disable();
            this.controls["hour"].disable();
          }
        }
      });
  }

  postConsultation(){
    if(this.controls['hour'].disabled || !this.form.valid) return;

    const newConsultation = this.getNewConsultation();
    this.consuService.postConsultation(newConsultation)
      .then(response => {
        this.consuService.handleResponse(response);
        if (response) {
          this.dialogRef.close(response); 
        }
      });
  }

  getNewConsultation(){
    const scheduleId = this.controls["scheduleId"].value as number;
    const hour = this.controls["hour"].value;
    return new NewConsultationRequest(scheduleId, hour)
  }
  
  cancel(){
    this.dialogRef.close();
  }

}
