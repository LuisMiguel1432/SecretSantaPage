import { inject, Injectable } from '@angular/core';
import { SecretSantaDTO } from '../dto/SecretSantaDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SecretSantaInfraestructureService {

  private http = inject(HttpClient); //asi se puede inyectar en servicios sin constructor
  
  loadSecretSantaForReceiver(groupId : number) : Observable<SecretSantaDTO>{
    return this.http.get<SecretSantaDTO>(`/api/secretSanta/group/${groupId}/mine/receiver`);
  }

  loadSecretSantaForGiver(groupId: number): Observable<SecretSantaDTO>{
    return this.http.get<SecretSantaDTO>(`/api/secretSanta/group/${groupId}/mine/giver`);
  }

  generateSecretSantasForGroup(groupId: number): Observable<void>{
    return this.http.post<void>(`/api/secretSanta/group/${groupId}/generate`,null);
  }
  hasAssignations(groupId: number): Observable<boolean>{
    return this.http.get<boolean>(`/api/secretSanta/group/${groupId}/hasAssignations`);
  }
}
