import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '../clients/table.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Table } from '../clients/Table';
import { Dropdown } from '../Models/Dropdown';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: number; private sub: any; clientForm: any; clientIdUpdate = null; massage = null; dataSaved = false;
  allDropdown: Dropdown[]; arSalutation : Dropdown[]; arStstus: Dropdown[]; arBidList: Dropdown[];
  arCatlogueList: Dropdown[]; arCategories: Dropdown[]; arContactType: Dropdown[]; arCatList: Dropdown[];
  arIntrestList: Dropdown[]; arLevelList: Dropdown[]; arStatusList: Dropdown[];
  dropdownSettings = {}; nameVisiblity =  true; selectedIntrests =[];intrestSettings = {}; 
  submitted = false; selectedCat =""; selectedInterest ="";
  constructor(private formbulider: FormBuilder, private route: ActivatedRoute, private tservice: TableService, private confirmationDialogService: ConfirmationDialogService, private router: Router ) { }

  ngOnInit() {

    this.clientForm = this.formbulider.group({
      contact_id: '',
      salutation: '',
      first_name: ['', Validators.required],
      last_name: '',
      company_name: '',
      contact_type: '',
      client_number: '',
      interest_id: '',
      category_id: '',
      customer_category_id: '',
      level_id: '',
      catalogue_id: '',
      marital_status_id: '',
      marriage_anniversary_date: '',
      am_customer_id: '',
      approval_status_id: '',
      authorized_to_bid_id: '',
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      fax: '',
      mobile: '',
      other_phone: '',
      clients_vat_tin_no: '',
      aadhar_number: '',
      pan_no: '',
      date_created: '',
      date_modified: ''
    });
   
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'code',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.intrestSettings = {
      singleSelection: false,
      idField: 'code',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      //class: "myclass custom-class"
      
    };
    this.onChanges();
    this
      .tservice
      .getAllDropdowns()
      .subscribe((data: Dropdown[]) => {
        this.allDropdown = data;
        this.arSalutation = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "salutation_list";
        });
        this.arStstus = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "approval_status_list";
        });
        this.arBidList = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "authorized_to_bid_list";
        });
        this.arCatlogueList = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "catalogue_list";
        });
        this.arCategories = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "categories_list";
        });
        this.arContactType = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "contact_type_list";
        });
        this.arCatList = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "customer_category_list";
        });
        this.arIntrestList = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "interest_list";
        });
        this.arLevelList = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "level_list";
        });
        this.arStatusList = this.allDropdown.filter(function(number) {
          return number.dropdown_name == "marital_status_list";
        });
       
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.loadClientToEdit(this.id);
      // In a real app: dispatch action to load the details here.
   });
  }
 
  loadClientToEdit(clientId: number) {  
    this.tservice.getClientById(clientId).subscribe(client=> {  
      // this.massage = null;  
      // this.dataSaved = false;  
      this.clientIdUpdate = client.contact_id;  
      this.clientForm.controls['contact_id'].setValue(client.contact_id);
      this.clientForm.controls['salutation'].setValue(client.salutation);
      this.clientForm.controls['first_name'].setValue(client.first_name);
      this.clientForm.controls['contact_type'].setValue(client.contact_type);
      this.clientForm.controls['client_number'].setValue(client.client_number);
      var commaSepInterest = new Array();
      commaSepInterest = client.interest_id.split(",");
      if(commaSepInterest)
      this.clientForm.controls['interest_id'].setValue(commaSepInterest);
      var commaSepCat = new Array();
      commaSepCat = client.category_id.split(",");
      if(commaSepCat)
      this.clientForm.controls['category_id'].setValue(commaSepCat);

      this.clientForm.controls['customer_category_id'].setValue(client.customer_category_id);
      this.clientForm.controls['level_id'].setValue(client.level_id);
      this.clientForm.controls['catalogue_id'].setValue(client.catalogue_id);
      this.clientForm.controls['marital_status_id'].setValue(client.marital_status_id);
      this.clientForm.controls['marriage_anniversary_date'].setValue(client.marriage_anniversary_date);
      this.clientForm.controls['am_customer_id'].setValue(client.am_customer_id);
      this.clientForm.controls['approval_status_id'].setValue(client.approval_status_id);
      this.clientForm.controls['authorized_to_bid_id'].setValue(client.authorized_to_bid_id);
      this.clientForm.controls['email'].setValue(client.email);
      this.clientForm.controls['phone'].setValue(client.phone);
      this.clientForm.controls['fax'].setValue(client.fax);
      this.clientForm.controls['mobile'].setValue(client.mobile);
      this.clientForm.controls['other_phone'].setValue(client.other_phone);
      this.clientForm.controls['clients_vat_tin_no'].setValue(client.clients_vat_tin_no);
      this.clientForm.controls['aadhar_number'].setValue(client.aadhar_number);
      this.clientForm.controls['pan_no'].setValue(client.pan_no);
      this.clientForm.controls['last_name'].setValue(client.last_name);
      this.clientForm.controls['company_name'].setValue(client.company_name);
 
    });  

}

onFormSubmit() {
  
  
  this.submitted = true;
  if (this.clientForm.invalid) {
   //alert("I got alert");
   return;
}
this.dataSaved = false;
const employee = this.clientForm.value;
this.selectedCat = employee.category_id.join(",");

//let result = employee.interest_id.map(a => a.code);
this.selectedInterest = employee.interest_id.join(",");
var objEmployee = {
  contact_id: employee.contact_id,
  salutation: employee.salutation,
  first_name: employee.first_name,
  contact_type: employee.contact_type,
  client_number: employee.client_number,
  interest_id: this.selectedInterest,
  category_id: this.selectedCat,
  customer_category_id: employee.customer_category_id,
  level_id: employee.level_id,
  catalogue_id: employee.catalogue_id,
  marital_status_id: employee.marital_status_id,
  marriage_anniversary_date: employee.marriage_anniversary_date,
  am_customer_id: employee.am_customer_id,
  approval_status_id: employee.approval_status_id,
  authorized_to_bid_id: employee.authorized_to_bid_id,
  email: employee.email,
  phone: employee.phone,
  fax: employee.fax,
  mobile: employee.mobile,
  other_phone: employee.other_phone,
  clients_vat_tin_no: employee.clients_vat_tin_no,
  aadhar_number: employee.aadhar_number,
  pan_no: employee.pan_no,
  last_name: employee.last_name,
  company_name: employee.company_name
    };

  this.UpdateClient(objEmployee);
  //this.clientForm.reset();
}

UpdateClient(client: Table) {
  if (this.clientIdUpdate != null) {
    client.contact_id = this.clientIdUpdate;
    this.tservice.updateClient(client).subscribe(() => {
      this.dataSaved = true;
      //this.massage = 'Record Updated Successfully';
      //this.openMessageDialog('Record got saved Successfully');
      this.openMessageDialog('Client Inserted');
          this.router.navigate(['/clients']);
      //this.loadAllEmployees();
      //this.clientIdUpdate = null;
      //this.clientForm.reset();
    });
  }
}

public openMessageDialog(message : any) {
  this.confirmationDialogService.message(message)
  .then((confirmed) => console.log('User confirmed:', confirmed))
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
}

onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}

onIntrestItemSelect(item: any) {
  console.log(item);
}
onIntrestSelectAll(items: any) {
  console.log(items);
}

get f() { return this.clientForm.controls; }
onChanges(): void{
 // alert(this.clientForm.get('last_name').value);
  //const client = this.clientForm.get('last_name');
  //const client = this.clientForm.value;
  this.clientForm.get('contact_type').valueChanges.subscribe(
    (mode: string) => {
      if(mode)
      {
      if (mode.toLowerCase() === 'company') {
        this.nameVisiblity = false; 
        //const client = this.clientForm.get('last_name');
        const client = this.clientForm.get('last_name').value;
        this.clientForm.controls['company_name'].setValue(client);
     }
     else if (mode.toLowerCase() === 'individual') {
      this.nameVisiblity = true;
     }
  }
    });
 
}
}
