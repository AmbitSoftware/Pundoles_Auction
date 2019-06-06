import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArtistService } from '../artist.service';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent{
  addartistform : any
  actionName = ""
  artistID = 0
  IsActionVisible : boolean = false

  constructor(private formbulider: FormBuilder,private artistservice: ArtistService,private confirmationDialogService: ConfirmationDialogService,private router : Router) { }
  ngOnInit() {
      debugger;
      this.addartistform = this.formbulider.group({   
      name: "",
      description: "",
      year_of_birth_c: "",
      year_of_death_c: "",
      status: true
    });   
    if(localStorage.getItem("artistmode")=="add"){
      this.actionName = "Save";
      this.IsActionVisible = true;
      // Enable the page fields
      this.addartistform.controls['name'].enable();
      this.addartistform.controls['description'].enable();
      this.addartistform.controls['year_of_birth_c'].enable();
      this.addartistform.controls['year_of_death_c'].enable();
      this.addartistform.controls['status'].enable();
    }
    else if(localStorage.getItem("artistmode")=="edit"){
      this.actionName = "Update";
      this.IsActionVisible = true;
      var data = JSON.parse(localStorage.getItem("artistselecteddata"));
      this.artistID = data.id;
      this.addartistform.controls['name'].setValue(data.name);
      this.addartistform.controls['description'].setValue(data.description);
      this.addartistform.controls['year_of_birth_c'].setValue(data.year_of_birth_c);
      this.addartistform.controls['year_of_death_c'].setValue(data.year_of_death_c);
      this.addartistform.controls['status'].setValue(data.status);
      // Enable the page fields
      this.addartistform.controls['name'].enable();
      this.addartistform.controls['description'].enable();
      this.addartistform.controls['year_of_birth_c'].enable();
      this.addartistform.controls['year_of_death_c'].enable();
      this.addartistform.controls['status'].enable();
    }
    else if(localStorage.getItem("artistmode")=="view"){
      this.IsActionVisible = false;
      var data = JSON.parse(localStorage.getItem("artistselecteddata"));
      this.artistID = data.id;
      this.addartistform.controls['name'].setValue(data.name);
      this.addartistform.controls['description'].setValue(data.description);
      this.addartistform.controls['year_of_birth_c'].setValue(data.year_of_birth_c);
      this.addartistform.controls['year_of_death_c'].setValue(data.year_of_death_c);
      this.addartistform.controls['status'].setValue(data.status);
      // disable the page fields
      this.addartistform.controls['name'].disable();
      this.addartistform.controls['description'].disable();
      this.addartistform.controls['year_of_birth_c'].disable();
      this.addartistform.controls['year_of_death_c'].disable();
      this.addartistform.controls['status'].disable();
    }
 }

 CreateArtist(){
  const data = this.addartistform.value;
  debugger;
  if(localStorage.getItem("artistmode")=="add"){
    var createObject = {
      name : data.name,
      description : data.description,
      year_of_birth_c : data.year_of_birth_c,
      year_of_death_c: data.year_of_death_c,
      status : data.status,
      createdby_id : JSON.parse(localStorage.getItem("login_id"))
    };
    debugger;
    this.artistservice.createArtist(createObject).subscribe(
      () => {    
        this.confirmationDialogService.message('Alert!', "Artist created successfully")
        .then((confirmed) =>  this.router.navigate(['/artist']) )
        
      }, 
      error => {
        this.confirmationDialogService.message('Alert!', error)
        .then((confirmed) =>  this.router.navigate(['/addArtist']) )
      }
    );
  }
  else{
    var updateObject = {
      id : this.artistID,
      name : data.name,
      description : data.description,
      year_of_birth_c : data.year_of_birth_c,
      year_of_death_c: data.year_of_death_c,
      status : data.status,
      modifiedby_id : JSON.parse(localStorage.getItem("login_id"))
    };
    debugger;
    this.artistservice.updateArtist(updateObject).subscribe(
      () => {    
        this.confirmationDialogService.message('Alert!', "Artist updated successfully")
        .then((confirmed) =>  this.router.navigate(['/artist']) )
        
      }, 
      error => {
        this.confirmationDialogService.message('Alert!', error)
        .then((confirmed) =>  this.router.navigate(['/addArtist']) )
      }
    );
  }
 }
}
