import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, BehaviorSubject } from 'rxjs';
import { UserAuthDTO } from '../dto/UserAuthDTO';
import { UserDTO } from '../dto/UserDTO';

export interface AuthResponseDTO {
  accessToken: string;
  user: UserDTO;
}

@Injectable({ providedIn: 'root' })
export class AuthInfraestructureService {
  private http = inject(HttpClient);

  private _currentUser = new BehaviorSubject<UserDTO | null>(null);
  currentUser$ = this._currentUser.asObservable();

  /** LOGIN */
  login(data: UserAuthDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>('/api/auth/login', data, {withCredentials: true })
      .pipe(
        tap(res => {
          sessionStorage.setItem('accessToken', res.accessToken)
          this._currentUser.next(res.user);
        })
      );
  }

  /** REGISTER */
  register(data: UserAuthDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>('/api/auth/register', data, { withCredentials: true })
      .pipe(
        tap(res => {
          sessionStorage.setItem('accessToken', res.accessToken)
          this._currentUser.next(res.user);
        })
      );
  }

  /** LOGOUT */
  logout(): void {
    sessionStorage.removeItem('accessToken');
    this._currentUser.next(null);
    this.http.post("/api/auth/logout",{withCredentials:true}).subscribe();
    // El refreshToken en cookie HttpOnly lo maneja el backend, si quieres limpiar se puede llamar a /logout
  }

  /** REFRESH TOKEN */
  refreshToken(): Observable<any> {
    return this.http.post<any>('/api/auth/refresh', null,{ withCredentials: true })
      .pipe(
        tap(res => {
          sessionStorage.setItem('accessToken', res.accessToken);
        })
      );
  }

  /** DEVUELVE TRUE SI HAY ACCESS TOKEN */
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  /** OBTENER ACCESS TOKEN */
  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }
  
  lookForCurrentUser() : Observable<UserDTO>{
    
    return this.http.get<UserDTO>('/api/user/me',{withCredentials: true}).pipe(tap(res => {this._currentUser.next(res); console.log(res)}));
  }

  get currentUserValue(): UserDTO {
    
    return this._currentUser.value;
  }
}