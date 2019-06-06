import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../User';
import { Dropdown } from 'src/app/Models/Dropdown';
import { TableService } from 'src/app/clients/table.service';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';
import { MustMatch } from '../add-user/must-match.validator';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  id: number; private sub: any; aUserform: any; userIdUpdate = null; massage = null; dataSaved = false; allDropdown: Dropdown[]; arUserStatus: Dropdown[]; 
  arUserType: Dropdown[]; usersDropdown: any; submitted = false;
  constructor(private formbulider: FormBuilder,private route: ActivatedRoute, private uservice: UserService, private tservice: TableService, private confirmationDialogService: ConfirmationDialogService, private router: Router) { }

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
      user_hash: '',
      confirm_password: '',
      //email: ['', [Validators.required, Validators.email]],
      is_admin: ''
    },
    {
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
  .uservice
  .getusers()
  .subscribe((data: User[]) => {
    this.usersDropdown = data;
});

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.loadUserToEdit(this.id);
      // In a real app: dispatch action to load the details here.
   });

   
  }

  loadUserToEdit(userId: number) {  
    //this.uservice.getDetails(userId);
    this.uservice.getUserById(userId).subscribe(user=> {  
      this.userIdUpdate = user.id;  
      this.aUserform.controls['user_name'].setValue(user.user_name);
      this.aUserform.controls['user_hash'].setValue(user.user_hash);
      this.aUserform.controls['first_name'].setValue(user.first_name); 
      this.aUserform.controls['last_name'].setValue(user.last_name);
      this.aUserform.controls['user_status'].setValue(user.user_status);
      this.aUserform.controls['phone_home'].setValue(user.phone_home);
      this.aUserform.controls['phone_mobile'].setValue(user.phone_mobile);
      this.aUserform.controls['department'].setValue(user.department);
      this.aUserform.controls['primary_email'].setValue(user.primary_email);
      this.aUserform.controls['alternate_email'].setValue(user.alternate_email);
      this.aUserform.controls['report_to_id'].setValue(user.report_to_id);
      this.aUserform.controls['user_type'].setValue(user.user_type);
      this.aUserform.controls['user_status'].setValue(user.user_status);
      
    }); 
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.aUserform.invalid) {
     //alert("I got alert");
     return;
  }
    this.dataSaved = false;
    const user = this.aUserform.value;
    this.UpdateUsers(user);
    //this.clientForm.reset();
  }
  
  UpdateUsers(objUser: User) {
    if (this.userIdUpdate != null) {
      objUser.id = this.userIdUpdate;
      this.uservice.updateUser(objUser).subscribe(() => {
        this.dataSaved = true;
        this.openMessageDialog('User updated');
        this.router.navigate(['/users']);
        //this.loadAllEmployees();
        //this.clientIdUpdate = null;
        //this.clientForm.reset();
      }, 
      error => {
        this.openMessageDialog('There is some error while updating record');
        console.log(error); 
      }
      
      );
    }
  }
  get f() { return this.aUserform.controls; }

  public openMessageDialog(message : any) {
    this.confirmationDialogService.message(message)
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  

}
