import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Consultation } from 'src/app/shared/models/consultation';
import { ClinicalConsultationsService } from '../clinical-consultations.service';
import { NewConsultationComponent } from '../new-consultation/new-consultation.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Message } from 'src/app/shared/models/constants';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Notifications } from 'src/app/shared/models/notifications';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-search-consultation',
  templateUrl: './search-consultation.component.html',
  styleUrls: ['./search-consultation.component.scss']
})
export class SearchConsultationComponent implements OnInit {
  consultations: Consultation[] = [];
  // grid
  displayedColumns: string[] = ['especialidade', 'medico', 'data', 'hora', 'acoes'];
  allowMultiSelect = false;
  dataSource!: any;
  selection = new SelectionModel(this.allowMultiSelect, []);
  messageEmpty = Message.messageEmpty;
  isConsultationsEmpty = true;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private consuService: ClinicalConsultationsService, private dialog: MatDialog, private notification: NotificationService,) { }

  ngOnInit(): void {
    this.search();
    this.getConsultation();
  }

  search() {
    this.paginator.pageIndex = 0;
    this.getConsultation();
  }

  loadGrid() {
    this.dataSource = new MatTableDataSource(this.consultations);
    this.selection = new SelectionModel(this.allowMultiSelect, []);
    this.dataSource.paginator = this.paginator;
    this.isConsultationsEmpty = this.consultations.length == 0;
  }

  async getConsultation() {
    await this.consuService.getConsultations()
      .then(response => {
        this.consuService.handleResponse(response);
        if (response) {
          this.consultations = response;
          this.loadGrid();
        } else {

        }
      });
  }

  openModalNewConsultation() {
    const dialogRef = this.dialog.open(NewConsultationComponent, {
      width: 'auto',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getConsultation();
        this.notification.success(Notifications.newConsultationSucess)
      }
    });
  }
  async deleteConsultation(consultationId: number) {
    await this.consuService.deleteConsultation(consultationId)
      .then(response => {
        this.getConsultation();
        this.notification.success(Notifications.deleteConsultationSucess);
      });
  }
}

