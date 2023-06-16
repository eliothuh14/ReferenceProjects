import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog'
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AccountService } from '../../account.service';
import { LoginComponent } from '../login/login.component';


/** Error when invalid control is dirty, touched, or submitted. */
 export class MyErrorStateMatcher implements ErrorStateMatcher {
     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
       const isSubmitted = form && form.submitted;
       return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
     }
   }

@Component({
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.css'],
    selector: 'create-account',
 })
 
 export class CreateAccountComponent {

  hide = true;
  firstName = new FormControl('');
  lastName = new FormControl(''); 
  email : string;
  password : string; 
  passwordFormControl = new FormControl('');
  emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    matcher = new MyErrorStateMatcher();
  


    constructor(private accountService : AccountService, public dialog: MatDialog,
      public dialogRef: MatDialogRef<CreateAccountComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any){}


  public onCreateNewAccount(){
      this.hide = false;
      this.email = this.emailFormControl.value;
      this.password = this.passwordFormControl.value;

      alert("New Account Created\n Name: "+this.firstName.value+" "+this.lastName.value+" \n email: "+this.email);
      this.accountService.addAccount(this.email , this.password);
      this.launchLoginWithFilledInformation();
      

    }
    public launchLoginWithFilledInformation(){
      this.dialog.open(LoginComponent, {
        width: '60vh',
        maxHeight: '60vh',
        data: {email: this.email}
    });

    }

  

 }