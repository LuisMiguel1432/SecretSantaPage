import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login-component/login-component';
import { RegisterComponent } from '../../components/register-component/register-component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginComponent, RegisterComponent,MatCardModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  constructor(private router:Router, private activaredRoute: ActivatedRoute) {}
  showLogin = true;
  returnUrl:string | null = "/";
  OnSwitch(){
    this.showLogin = !this.showLogin;
  }

  OnFinished(){
    this.returnUrl = this.activaredRoute.snapshot.queryParamMap.get("returnUrl") || '/';
    this.router.navigate([this.returnUrl]);
  }
}
