import { Injectable } from '@angular/core';
import { SecretSantaInfraestructureService } from '../../infrastructure/services/secret-santa-infraestructure-service';
import { map, Observable } from 'rxjs';
import { SecretSanta } from '../models/SecretSanta';
import { SecretSantaMapper } from '../../infrastructure/mappers/SecretSantaMapper';

@Injectable({
  providedIn: 'root',
})
export class SecretSantaDomainService {
  constructor( private secretSantaInfrastructureService: SecretSantaInfraestructureService) {}

  loadSecretSantaForReceiver(groupId : number): Observable<SecretSanta>{
    return this.secretSantaInfrastructureService.loadSecretSantaForReceiver(groupId).pipe(map(secretSantaDTO => SecretSantaMapper.DTOToModel(secretSantaDTO)));
  }

  loadSecretSantaForGiver(groupId: number): Observable<SecretSanta>{
    return this.secretSantaInfrastructureService.loadSecretSantaForGiver(groupId).pipe(map(secretSantaDTO => SecretSantaMapper.DTOToModel(secretSantaDTO)));
  }
  generateSecretSantasForGroup(groupId: number): Observable<void>{
    return this.secretSantaInfrastructureService.generateSecretSantasForGroup(groupId);
  }
  hasAssignations(groupId: number): Observable<boolean>{
    return this.secretSantaInfrastructureService.hasAssignations(groupId);
  }
}
