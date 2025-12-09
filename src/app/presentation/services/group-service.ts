import { Injectable } from '@angular/core';
import { GroupDomainService } from '../../domain/service/group-domain-service';
import { Group } from '../../domain/models/Group';
import { Observable } from 'rxjs';
import { GroupApplicationService } from '../../application/services/group-application-service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

  constructor(private groupApplicationService: GroupApplicationService) { }

  createGroup(group:Group) : Observable<void> {
    return this.groupApplicationService.createGroup(group);
  }
  findGroupByUserId() : Observable<Group[]> {

   return this.groupApplicationService.findGroupByUserId(); 
  
  }
  findGroupById(id:number): Observable<Group>{
    return this.groupApplicationService.findGroupById(id)
  }
  addUserToGroup(id:number): Observable<void>{
    return this.groupApplicationService.addUserToGroup(id)
  }
}
