import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-search-consultation',
  templateUrl: './search-consultation.component.html',
  styleUrls: ['./search-consultation.component.scss']
})
export class SearchConsultationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.getUsername);
    
  }

}
