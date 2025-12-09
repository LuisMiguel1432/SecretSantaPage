import { Injectable, SkipSelf } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../services/auth-service";


@Injectable()
export class UserRegisterVM {
  private _username = new BehaviorSubject<string>('');
  username$ = this._username.asObservable();
  get username(): string { return this._username.value; }
  set username(value: string) { this._username.next(value); }

  private _password = new BehaviorSubject<string>('');
  password$ = this._password.asObservable();
  get password(): string { return this._password.value; }
  set password(value: string) { this._password.next(value); }

  private _loading = new BehaviorSubject(false);
  loading$ = this._loading.asObservable();
  get loading(): boolean {
    return this._loading.value;
  }
  set loading(value: boolean) {
    this._loading.next(value);
  }

  private _error = new BehaviorSubject<string | null>(null);
  error$ = this._error.asObservable();
  get error(): string | null {
    return this._error.value;
  }
  set error(value: string | null) {
    this._error.next(value);
  }

  private _success = new BehaviorSubject<boolean>(false);
  success$ = this._success.asObservable();
  get success(): boolean {
    return this._success.value;
  }
  set success(value: boolean) {
    this._success.next(value);
  }

  constructor( private userLoginService: AuthService) {}

  register (){
    const user = {
      id: null,
      username: this.username,
      password: this.password
    };
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.error = 'Username and password are required.';
      return;
    }
    this.loading = true;
    this.error = null;
    this.success=false;
    this.userLoginService.register(user).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;;
      },
      error: (err) => {
        this.loading = false;
        this.error = err.message || 'Login failed. Please try again.';
      }
    });
  }
}

