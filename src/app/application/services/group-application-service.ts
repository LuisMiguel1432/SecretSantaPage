import { Injectable } from '@angular/core';
import { GroupDomainService } from '../../domain/service/group-domain-service';
import { Group } from '../../domain/models/Group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupApplicationService {

  constructor(private groupDomainService: GroupDomainService) { }

  createGroup(group:Group) : Observable<void> {
    return this.groupDomainService.createGroup(group);
  }
  findGroupByUserId() : Observable<Group[]> {

   return this.groupDomainService.findGroupByUserId(); 
  
  }

  findGroupById(id:number): Observable<Group>{
    return this.groupDomainService.findGroupById(id);
  }

  addUserToGroup(id:number): Observable<void>{
    return this.groupDomainService.addUserToGroup(id)
  }
}
