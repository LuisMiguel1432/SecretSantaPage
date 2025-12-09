import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UserRegisterVM } from '../../viewModels/UserRegisterVM';
import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../validators/password-matcher-validator';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
  providers: [UserRegisterVM]
})

export class RegisterComponent {

  _repeatPassword:BehaviorSubject<string> = new BehaviorSubject<string>('');
  repeatPassword$:Observable<string> = this._repeatPassword.asObservable();
  get repeatPassword(): string { return this._repeatPassword.value; }
  set repeatPassword(value: string) { this._repeatPassword.next(value); }

  username$:Observable<string>;
  get username(): string { return this.registerViewModel.username; }
  set username(value: string) { this.registerViewModel.username = value; }

  password$:Observable<string>;
  get password(): string { return this.registerViewModel.password; }
  set password(value: string) { this.registerViewModel.password = value; }

  loading$:Observable<boolean>;
  success$:Observable<boolean>;
  error$:Observable<string | null>;

  registerForm: FormGroup;

  constructor(private registerViewModel: UserRegisterVM, private fb: FormBuilder) {
    this.username$ = registerViewModel.username$;
    this.password$ = registerViewModel.password$;
    this.loading$ = registerViewModel.loading$;
    this.success$ = registerViewModel.success$;
    this.error$ = registerViewModel.error$;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    },{ validators: passwordMatchValidator});
  }


  @Output() switchToLogin = new EventEmitter<void>();
  @Output() finished = new EventEmitter<void>();

  onSwitchToLogin() {
    this.switchToLogin.emit();
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    const formValues = this.registerForm.value;
    this.username = formValues.username;
    this.password = formValues.password;

    this.registerViewModel.register();
    this.success$.subscribe(succeded=>{
      if(succeded){
        this.finished.emit();
      }
    });
  }
}

