import { Injectable } from '@angular/core';
import { SecretSantaDomainService } from '../../domain/service/secret-santa-domain-service';
import { Observable } from 'rxjs';
import { SecretSanta } from '../../domain/models/SecretSanta';
import { SecretSantaApplicationService } from '../../application/services/secret-santa-application-service';

@Injectable({
  providedIn: 'root',
})
export class SecretSantaService {
  constructor(private secretSantaApplicationService: SecretSantaApplicationService) {}

  loadSecretSantaForReceiver(groupId: number) : Observable<SecretSanta>{
    return this.secretSantaApplicationService.loadSecretSantaForReceiver(groupId);
  }

  loadSecretSantaForGiver(groupId: number): Observable<SecretSanta>{
    return this.secretSantaApplicationService.loadSecretSantaForGiver(groupId);
  }

  generateSecretSantasForGroup(groupId: number): Observable<void>{
    return this.secretSantaApplicationService.generateSecretSantasForGroup(groupId);
  }

  hasAssignations(groupId: number): Observable<boolean>{
    return this.secretSantaApplicationService.hasAssignations(groupId);
  }

}
