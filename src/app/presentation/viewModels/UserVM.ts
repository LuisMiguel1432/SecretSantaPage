import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDTO } from '../../infrastructure/dto/UserDTO';
import { UserService } from '../services/user-service';
import { User } from '../../domain/models/User';


@Injectable()

export class UserVM {
  id: number;
  username: string;
  
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  private _error = new BehaviorSubject<string | null>(null);
  error$ = this._error.asObservable();

  constructor(private userService: UserService) {}
/** 
  loadUser(userId: string) {
    this._loading.next(true);
    this._error.next(null);

    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this._user.next(user);
        this._loading.next(false);
      },
      error: () => {
        this._error.next('No se pudo cargar el usuario');
        this._loading.next(false);
      }
    });
  }

*/
}