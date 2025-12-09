import { Injectable } from '@angular/core';
import { AuthResponseDTO, AuthInfraestructureService } from '../../infrastructure/auth/auth-infrastructure-service';
import { UserAuthDTO } from '../../infrastructure/dto/UserAuthDTO';
import { Observable } from 'rxjs';
import { UserRegisterVM } from '../../presentation/viewModels/UserRegisterVM';
import { User } from '../models/User';
import { UserMapper } from '../../infrastructure/mappers/UserMapper';
import { UserDTO } from '../../infrastructure/dto/UserDTO';

@Injectable({
  providedIn: 'root',
})

export class AuthDomainService {
  constructor(private authInfrastructureService : AuthInfraestructureService) {}
  
  login(data: User) : Observable<AuthResponseDTO> { 
    return this.authInfrastructureService.login(UserMapper.userModelToDTO(data));
  }

  register(data: User): Observable<AuthResponseDTO> {
    return this.authInfrastructureService.register(UserMapper.userModelToDTO(data));
  }

  getCurrentUser(): User{
    const userDTO: UserDTO = this.authInfrastructureService.currentUserValue;
    if(userDTO == null){
      return null;
    }
    return UserMapper.dtoToModel(userDTO);
  }

  lookForCurrentUser() : Observable<UserDTO>{
    return this.authInfrastructureService.lookForCurrentUser();
  }
}
