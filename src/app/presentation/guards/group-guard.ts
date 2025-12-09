import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GroupStateService } from '../services/group-state-service';
import { catchError, map, of } from 'rxjs';
import { GroupService } from '../services/group-service';

export const groupGuard: CanActivateFn = (route, state) => {
  const groupStateService: GroupStateService = inject(GroupStateService);
  const groupService: GroupService = inject(GroupService);
  const router : Router = inject(Router);
  if(sessionStorage.getItem("selectedGroup") && !groupStateService.hasSelectedGroup()){
    return groupService.findGroupById(Number(sessionStorage.getItem("selectedGroup"))).pipe(
    map((res)=>{ 
      groupStateService.selectedGroup = res;
      if(!groupStateService.hasSelectedGroup()){
        return router.createUrlTree(['/']);
      }else{
        return true;
      }
        
      }), 
      catchError(() =>{
        return of(router.createUrlTree(['/']));
    }));
  }

  if(!groupStateService.hasSelectedGroup()){
    return of(router.createUrlTree(["/"]))
  }
  return true;
  
}

