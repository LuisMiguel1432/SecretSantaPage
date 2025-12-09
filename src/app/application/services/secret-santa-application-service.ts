import { Injectable } from '@angular/core';
import { SecretSantaDomainService } from '../../domain/service/secret-santa-domain-service';
import { Observable } from 'rxjs';
import { SecretSanta } from '../../domain/models/SecretSanta';

@Injectable({
  providedIn: 'root',
})
export class SecretSantaApplicationService {
  constructor(private secretSantaDomainService: SecretSantaDomainService) {}

  loadSecretSantaForReceiver(groupId: number) : Observable<SecretSanta>{
    return this.secretSantaDomainService.loadSecretSantaForReceiver(groupId);
  }

  loadSecretSantaForGiver(groupId: number): Observable<SecretSanta>{
    return this.secretSantaDomainService.loadSecretSantaForGiver(groupId);
  }

  generateSecretSantasForGroup(groupId: number): Observable<void>{
    return this.secretSantaDomainService.generateSecretSantasForGroup(groupId);
  }
  hasAssignations(groupId: number): Observable<boolean>{
    return this.secretSantaDomainService.hasAssignations(groupId);
  }

}
