import { Injectable } from '@angular/core';
import { GroupInfrastructureService } from '../../infrastructure/services/group-infrastructure-service';
import { Group } from '../models/Group';
import { GroupMapper } from '../../infrastructure/mappers/GroupMapper';
import { map, Observable } from 'rxjs';
import { GroupDTO } from '../../infrastructure/dto/GroupDTO';

@Injectable({
  providedIn: 'root',
})
export class GroupDomainService {
  constructor(private groupInfrastructureService: GroupInfrastructureService) { }
  
  createGroup(group:Group) : Observable<void> {
     return this.groupInfrastructureService.createGroup(GroupMapper.modelToDto(group));
  }

  findGroupByUserId() : Observable<Group[]> {
    
    return this.groupInfrastructureService.findGroupByUserId().pipe(map(dtos => {
      return dtos ? dtos.map(dto => GroupMapper.dtoToModel(dto)) : null
    }));
  }
  findGroupById(id:number): Observable<Group>{
    return this.groupInfrastructureService.findGroupById(id).pipe(map(dto => {
      return dto ? GroupMapper.dtoToModel(dto): null
    }));
  }

   addUserToGroup(id:number): Observable<void>{
    return this.groupInfrastructureService.addUserToGroup(id)
  }
}
