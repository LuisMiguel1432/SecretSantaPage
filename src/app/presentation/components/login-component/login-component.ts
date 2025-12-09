import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLoginVM } from '../../viewModels/UserLoginVM';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
  providers: [UserLoginVM]
})
export class LoginComponent {
  @Output() switchToRegister = new EventEmitter<void>();
  @Output() finished = new EventEmitter<void>();

  username$:Observable<string>;
  get username(): string { return this.loginViewModel.username; }
  set username(value: string) { this.loginViewModel.username = value; }

  password$:Observable<string>;
  get password(): string { return this.loginViewModel.password; }
  set password(value: string) { this.loginViewModel.password = value; }

  loading$:Observable<boolean>;
  success$:Observable<boolean>;
  error$:Observable<string | null>;

  loginForm: FormGroup;

  constructor(private loginViewModel: UserLoginVM, private fb: FormBuilder) {
    this.username$ = loginViewModel.username$;
    this.password$ = loginViewModel.password$;
    this.loading$ = loginViewModel.loading$;
    this.success$ = loginViewModel.success$;
    this.error$ = loginViewModel.error$;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onSwitchToRegister() {
    this.switchToRegister.emit();
  }

  onLogin() {
    if(this.loginForm.invalid){
      return;
    }
    const formValues = this.loginForm.value;
    this.username = formValues.username;
    this.password = formValues.password;
    this.loginViewModel.login();
    this.success$.subscribe(succeded=>{
      if(succeded){
        this.finished.emit();
      }
    });
  }
}
