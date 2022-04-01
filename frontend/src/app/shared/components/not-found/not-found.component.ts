import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Pages } from '../../models/pages';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    constructor( private location: Location, private router: Router,) { }

  ngOnInit() {

  }
  goBack(){
    this.router.navigate([Pages.Authentication.login]);
  }
}

