import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';
import { Dropdown } from 'src/app/Models/Dropdown';
import { TableService } from 'src/app/clients/table.service';
import { Router } from '@angular/router';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  id: number; private sub: any; aUserform: any; userIdUpdate = null; massage = null; dataSaved = false; allDropdown: Dropdown[]; arUserStatus: Dropdown[]; arUserType: Dropdown[]; usersDropdown: any;
  submitted = false;

  constructor(private formbulider: FormBuilder, private uservice: UserService, private confirmationDialogService: ConfirmationDialogService, private tservice: TableService, private router: Router) { }

  ngOnInit() {
    this.aUserform = this.formbulider.group({
      id:'',
      user_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_status: ['', Validators.required],
      user_type: ['', Validators.required],
      department: '',
      report_to_id: '',
      primary_email: ['', [Validators.required, Validators.email]],
      alternate_email: ['', Validators.email],
      phone_mobile: '',
      phone_home: '',
      user_hash: ['', Validators.required],
      confirm_password: '',
      //email: ['', [Validators.required, Validators.email]],
      is_admin: ''
    }, {
      validator: MustMatch('user_hash', 'confirm_password')
  });

    this
      .tservice
      .getAllDropdowns()
      .subscribe((data: Dropdown[]) => {
        this.allDropdown = data;
        this.arUserStatus = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "user_status_list";
        });
        this.arUserType = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "user_type_list";
        });
    });

    this
    .tservice
    .getusers()
    .subscribe((data: User[]) => {
      this.usersDropdown = data;
  });

  }

  onFormSubmit() {
    this.submitted = true;
    if (this.aUserform.invalid) {
     //alert("I got alert");
     return;
  }
    this.dataSaved = false;
    const objUser = this.aUserform.value;
    this.CreateUser(objUser);
    //this.aUserform.reset();
  }

  CreateUser(objUser: User) {
    var obj = {
      user_name: objUser.user_name,
      user_hash:objUser.user_hash,
      first_name: objUser.first_name,
      last_name: objUser.last_name,
      phone_home: objUser.phone_home,
      phone_mobile: objUser.phone_mobile,
      department: objUser.department,
      primary_email: objUser.primary_email,
      alternate_email: objUser.alternate_email,
      report_to_id: objUser.report_to_id,
      user_type: objUser.user_type,
      user_status: objUser.user_status
    };
    if (this.userIdUpdate == null) {
      this.uservice.createUser(obj).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'User saved Successfully';
          this.openMessageDialog('User Inserted');
          this.router.navigate(['/users']);
          this.userIdUpdate = null;
          //this.aUserform.reset();
        }, 
        error => {
          this.openMessageDialog('There is some error while updating record');
          console.log(error); 
        }
      );
    } 
    // else {
    //   objUser.id = this.userIdUpdate;
    //   this.uservice.updateClient(objUser).subscribe(() => {
    //     this.dataSaved = true;
    //     this.massage = 'Record Updated Successfully';
    //     this.openMessageDialog('Record got Updated Successfully');
    //     //this.loadAllEmployees();
    //     this.userIdUpdate = null;
    //     this.aUserform.reset();
    //   });
    // }
  }

  public openMessageDialog(message : any) {
    this.confirmationDialogService.message(message)
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  get f() { return this.aUserform.controls; }

}
