import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AccountService } from 'src/app/account.service';
import { LoginComponent } from 'src/app/components/login/login.component';
import { LogoutComponent } from 'src/app/components/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ctc-radio';
  logInOrOut = 'Login';
  accountEmail: string;
  accountPassword: string;
  login = false;

  constructor(public dialog: MatDialog, private acc: AccountService) {}

  ngOnInit() {

  }

  openAccount(): void {
    if (this.logInOrOut == 'Login') {
      const ref = this.dialog.open(LoginComponent, {
        width: '600px',
        panelClass: 'my-dialog',
        data: {email: this.accountEmail, password: this.accountPassword, login: this.login}
      });

      this.logInOrOut = 'Account';
    } else {
      if (this.logInOrOut == 'Account') {
        this.dialog.open(LogoutComponent, {
          width: '600px',
          panelClass: 'my-dialog',
          data: {email: this.accountEmail, password: this.accountPassword, login: this.login}
        });


      this.logInOrOut = 'Login';

    }
  }


  

  
}

}
