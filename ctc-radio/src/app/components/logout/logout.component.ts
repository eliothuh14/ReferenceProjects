import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog'
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { AccountService } from '../../account.service';


/** Error when invalid control is dirty, touched, or submitted. */
 export class MyErrorStateMatcher implements ErrorStateMatcher {
     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
       const isSubmitted = form && form.submitted;
       return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
     }
   }

@Component({
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css'],
    selector: 'logout',
 })
 
 export class LogoutComponent implements OnInit{

        email : string;
    
     
      constructor(private accountService : AccountService, public dialog: MatDialog,
        public dialogRef: MatDialogRef<LogoutComponent>,
       @Inject(MAT_DIALOG_DATA) public data:any){
        }
    ngOnInit(): void {
        this.email = this.accountService.getCurrentAccountEmail();
        
    }


    public onSubmitLogout(){
            this.accountService.logout();
        

    }


      

 }