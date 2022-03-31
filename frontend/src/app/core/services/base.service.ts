import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { ConfigService } from './config.service';

@Injectable()
export class BaseService {

    constructor(protected notificationService: NotificationService, protected httpClient: HttpClient, protected configService: ConfigService) { }

    handleResponse(response: any) {
        if (response.success && this.hasInformations(response))
            this.notificationService.success(response.informations[0]);
        else if (this.hasErrors(response))
            this.notificationService.error(response.errors[0]);

        return response.data || {};
    }

    hasInformations(response: any): boolean {
        let messages = response.informations as Array<string>
        return messages != null && messages.length > 0;
    }

    hasErrors(response: any): boolean {
        let messages = response.errors as Array<string>
        return messages != null && messages.length > 0;
    }

    get urlApi(): string {
        return this.configService.urlApi;
    }
}