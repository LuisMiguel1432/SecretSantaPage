import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDomainService } from '../../domain/service/auth-domain-service';
import { User } from '../../domain/models/User';
import { UserDTO } from '../../infrastructure/dto/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthApplicationService {
  constructor(private userLoginDomainService: AuthDomainService) {
  } // Reemplaza 'any' con el tipo correcto del servicio de dominio

  login(vm:User) {
    return this.userLoginDomainService.login(vm);
  }

  register(vm:User) {
    return this.userLoginDomainService.register(vm);
  }

  getCurrentUser(): User{
    return this.userLoginDomainService.getCurrentUser();
  }

  lookForCurrentUser():Observable<UserDTO>{
    return this.userLoginDomainService.lookForCurrentUser();
  }


}
