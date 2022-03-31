import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {

    constructor(protected toastrService: ToastrService) { }

    info(message: string) {
        this.toastrService.info(message);
    }
    warning(message: string) {
        this.toastrService.warning(message);
    }
    error(message: string) {
        this.toastrService.error(message);
    }
    success(message: string) {
        this.toastrService.success(message);        
    }
}