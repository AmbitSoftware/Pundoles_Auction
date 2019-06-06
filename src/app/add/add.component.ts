import { Component, OnInit } from '@angular/core';
import { TableService } from '../clients/table.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Dropdown } from '../Models/Dropdown';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  dataSaved = false;
  clientForm: any;
  submitted = false;
  selectedCat ="";
  selectedInterest ="";
  
  clientIdUpdate = null;
  massage = null;
  allDropdown: Dropdown[]; arSalutation : Dropdown[]; arStstus: Dropdown[]; arBidList: Dropdown[];
  arCatlogueList: Dropdown[]; arCategories: Dropdown[]; arContactType: Dropdown[]; arCatList: Dropdown[];
  arIntrestList: Dropdown[]; arLevelList: Dropdown[]; arStatusList: Dropdown[];
  dropdownList = []; selectedItems = []; selectedIntrests =[]; dropdownSettings = {}; intrestSettings = {};
  nameVisiblity =  true;
  constructor(private formbulider: FormBuilder,private spinner: NgxSpinnerService, private tservice: TableService,private confirmationDialogService: ConfirmationDialogService, private router: Router ) {

    
   }

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

    //Dropdown
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'code',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      //class: "myclass custom-class"
      
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
    //Dropdown
    this.onChanges();
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
    
    let result = employee.interest_id.map(a => a.code);
    this.selectedInterest = result.join(",");
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
    
    this.CreateClient(objEmployee);
    this.spinner.show();
  
    setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
    }, 3000);
    //this.clientForm.reset();
  }

  CreateClient(client: any) {
    if (this.clientIdUpdate == null) {
      this.tservice.createClient(client).subscribe(
        () => {
          this.dataSaved = true;
          // alert("Record got saved Successfully");
          this.openMessageDialog('Client Inserted');
          this.router.navigate(['/clients']);
         // this.openMessageDialog('Record got saved Successfully');
          //this.clientIdUpdate = null;
        }, 
        error => {
          this.openMessageDialog('There is some error while saveing record');
          //alert("There is some error while saveing record");
        }
      );
    } 
  }

  public openConfirmationDialog() {
    this.confirmationDialogService.confirm('Record Saved', 'Do you really want to ... ?')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  public openMessageDialog(message : any) {
    this.confirmationDialogService.message(message)
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  get f() { return this.clientForm.controls; }

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
 
 
  onChanges(): void{
    this.clientForm.get('contact_type').valueChanges.subscribe(
      (mode: string) => {
        if(mode)
        {
        if (mode.toLowerCase() === 'company') {
          this.nameVisiblity = false; 
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
