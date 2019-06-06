import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  settings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
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
      //     return `<a title="Edit" href="#/updateUser">Update</a>`
      //   },
      //   filter:false       
      // },
      user_name: {
        title: 'Username'
      },
      first_name: {
        title: 'First Name'
      },
      last_name: {
        title: 'Last Name'
      },
      phone_home: {
        title: 'Phone'
      },
      email: {
        title: 'Email'
      }

    }
  };
  constructor(private router: Router, private tservice: UserService) { }

  ngOnInit() {
    this
      .tservice
      .getusers()
      .subscribe((data: User[]) => {
        this.users = data;
    });
  }
  onCustomAction(event) {
    switch ( event.action) {
      case 'deleterecord':
        this.deleteRecord(event.data);
        break;
     case 'editrecord':
        this.editRecord(event.data);
    }
  }

  public editRecord(formData: any) {
    this.router.navigate(['/updateUser/'+ formData.id]);
  }
  public deleteRecord(formData: any) {
    
  }

}
