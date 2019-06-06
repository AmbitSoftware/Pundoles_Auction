import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';
import { Table } from './Table';
import {Router} from "@angular/router";
import { AlertsService } from 'angular-alert-module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [DatePipe]
})
export class ClientsComponent implements OnInit {

  characters: Table[];
  settings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
      { name: 'viewrecord', title: 'Delete'},
      { name: 'editrecord', title: '&nbsp;&nbsp;Update' }
    ],
      position: 'left'
    },
    columns: {

      // Actions: //or something
      // {
      //   title:'',
      //   type:'html',
      //   valuePrepareFunction:(cell,row)=>{
      //     return `<a title="Edit" href="/update">Update</a>`
      //   },
      //   filter:false       
      // },
      // contact_id : {
      //   title: 'Contact Id'
      // },
      first_name: {
        title: 'Name'
      },
      client_number: {
        title: 'Client Number'
      },
      contact_type: {
        title: 'Contact Type'
      },
      company_name: {
        title: 'Company Name'
      },
      catalogue_id: {
        title: 'Catalogue'
      },
      email: {
        title: 'Email Address'
      },
      phone: {
        title: 'Office Phone'
      },
      date_created: {
        title: 'Date Created',
        valuePrepareFunction: (created) => {
          return this.datePipe.transform(new Date(created), 'dd MMM yyyy');
        }
      },

    }
  };
  constructor(private router: Router, private tservice: TableService, private alerts: AlertsService, private datePipe: DatePipe ) { }

  ngOnInit() {
    this
      .tservice
      .getClient()
      .subscribe((data: Table[]) => {
        this.characters = data;
    });
  }

  onSave(event: any) {
    this.tservice.createClient(event.data);
}
editUser(client: Table): void {
  localStorage.removeItem("editUserId");
  localStorage.setItem("editUserId", client.contact_id.toString());
  this.router.navigate(['/update']);
};

onCustomAction(event) {
  switch ( event.action) {
    case 'viewrecord':
      this.viewRecord(event.data);
      break;
   case 'editrecord':
      this.editRecord(event.data);
  }
}

public editRecord(formData: any) {
  this.router.navigate(['/update/'+ formData.contact_id]);
}
public viewRecord(formData: any) {
  // this.modalRef = this.modalService.open(ViewProfileComponent);
  // this.modalRef.componentInstance.formData = formData;
  // this.modalRef.result.then((result) => {
  //   if (result === 'success') {
  //     this.loadData();
  //   }
  // }, (reason) => {
  // });
}

}
