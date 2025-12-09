import { inject, Injectable } from '@angular/core';
import { GroupDTO } from '../dto/GroupDTO';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupInfrastructureService{
    
  private http = inject(HttpClient); //asi se puede inyectar en servicios sin constructor  
    
  createGroup(groupDto:GroupDTO) : Observable<void> {
    return this.http.post<void>('/api/group/create', groupDto);
  }
  findGroupByUserId() : Observable<GroupDTO[]> {
    return this.http.get<GroupDTO[]>(`/api/group/getMyGroups`);
  }
  findGroupById(id:number): Observable<GroupDTO> {
    return this.http.get<GroupDTO>(`/api/group/get/${id}`);
  }

   addUserToGroup(id:number): Observable<void>{
    return this.http.post<void>(`/api/group/add/group/${id}`,null);
  }
}
