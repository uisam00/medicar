export class NewConsultationRequest {
    agenda_id: number;
    horario: any;
    constructor(agenda_id:number, horario:any){
        this.agenda_id = agenda_id;
        this.horario = horario;
    }
}