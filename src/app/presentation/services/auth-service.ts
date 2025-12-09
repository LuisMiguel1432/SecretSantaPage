import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/User';
import { UserDTO } from '../../infrastructure/dto/UserDTO';
import { AuthApplicationService } from '../../application/services/auth-application-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userApplicationService: AuthApplicationService) {
  } // Reemplaza 'any' con el tipo correcto del servicio de dominio

  login(vm:User) {
    return this.userApplicationService.login(vm);
  }

  register(vm:User) {
    return this.userApplicationService.register(vm);
  }

  getCurrentUser(): User{
    return this.userApplicationService.getCurrentUser();
  }

  lookForCurrentUser():Observable<UserDTO>{
    return this.userApplicationService.lookForCurrentUser();
  }


}
