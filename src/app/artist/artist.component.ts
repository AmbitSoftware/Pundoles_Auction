import { Component, OnInit } from '@angular/core';
import { ArtistService } from './artist.service';
import { Artist } from './Artist';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Row } from 'ng2-smart-table/lib/data-set/row';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artists: any[];
  settings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
      { name: 'editArtist', title: 'Edit'},
      { name: 'viewArtist', title: 'View'}
    ],
      position: 'left'
    },
    columns: {    
      name: {
        title: 'Name'
      },
      description: {
        title: 'Description'
      },
      year_of_birth_c: {
        title: 'Date Of Birth'
      },
      year_of_death_c: {
        title: 'Date Of Death'
      },
      status: {
        title: 'Status',
        valuePrepareFunction: (value) => { return value === true ? 'Active' : 'Inactive' }
      }
    }
  };
  constructor(private tservice: ArtistService,private router : Router,private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    debugger;
    this.tservice.getartists().subscribe((data: any) => {
        this.artists = data;
       },
       error => {
         debugger;
          if(error.status==401){
            this.confirmationDialogService.message('Alert!', "unauthorized or session has expired!.Kindly login again.")
            this.router.navigate(['/login']); 
          }
      });
  }

  AddNewArtist(){  
      localStorage.setItem("artistmode","add");
      this.router.navigate(['/addArtist']); 
  }

  onCustomAction(event) {
    debugger;
    switch (event.action) {
      case 'viewArtist':
        this.viewArtist(event);
        break;
     case 'editArtist':
        this.editArtist(event);
    }
  }

  public editArtist(event){
   localStorage.setItem("artistmode","edit");
   localStorage.setItem("artistselecteddata", JSON.stringify(event.data));
   this.router.navigate(['/addArtist']); 
  }

  public viewArtist(event){
    localStorage.setItem("artistmode","view");
    localStorage.setItem("artistselecteddata", JSON.stringify(event.data));
    this.router.navigate(['/addArtist']); 
   }
}
