import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatBadgeModule } from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    NotFoundComponent,
    MenuTopComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    LayoutModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgbModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    NgxSpinnerModule,
    MatCardModule,
    MatButtonModule,
    LayoutModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgbModule,
    MatCheckboxModule,
    NotFoundComponent,
    MenuTopComponent,
    MatSelectModule
  ],
  providers: [
  ]
})
export class SharedModule { }
