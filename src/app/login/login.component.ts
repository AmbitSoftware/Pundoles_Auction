import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(private formbulider: FormBuilder, private router : Router, private loginservice : LoginService,private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.loginForm = this.formbulider.group({
      username:'',
      password: '',
    });
  }

  RedirectTo(){
    const user = this.loginForm.value;
    var loginObject = "grant_type=password&username="+user.username+"&password="+user.password;
    this.loginservice.loginUser(loginObject).subscribe( (response : any) => {
      console.log(response); 
      debugger;
      localStorage.setItem("access_token", JSON.stringify(response.access_token));
      localStorage.setItem("login_id", response.id);
      this.router.navigate(['/users']);
    }, 
    error => {
      this.openMessageDialog(error["error"].error_description);
    });
  }

  public openMessageDialog(message : any) {
    this.confirmationDialogService.message('Alert!',message);
  }
}
