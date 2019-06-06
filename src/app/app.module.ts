import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientsComponent } from './clients/clients.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { TableService } from './clients/table.service';
import { ArtistService } from './artist/artist.service';
import { UserService } from './users/user.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ArtistComponent } from './artist/artist.component';
import { AuctionCalendarComponent } from './auction-calendar/auction-calendar.component';
import { AddArtistComponent } from './artist/add-artist/add-artist.component';
import { UpdateArtistComponent } from './artist/update-artist/update-artist.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AlertsModule } from 'angular-alert-module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientsComponent,
    AddComponent,
    UpdateComponent,
    ArtistComponent,
    AuctionCalendarComponent,
    AddArtistComponent,
    UpdateArtistComponent,
    LoginComponent,
    UsersComponent,
    AddUserComponent,
    UpdateUserComponent,
    ConfirmationDialogComponent
   
  ],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertsModule.forRoot(),
    NgbModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),

  ],
  providers: [TableService, ArtistService, UserService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  exports: [ConfirmationDialogComponent],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AppModule { }
