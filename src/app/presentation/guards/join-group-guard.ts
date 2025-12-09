import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GroupService } from '../services/group-service';
import { catchError, map, of } from 'rxjs';

export const joinGroupGuard: CanActivateFn = (route, state) => {
  const groupService = inject(GroupService);
  const router = inject(Router);
  const groupId = Number(route.paramMap.get("id"));
  if(!groupId){
    return of(router.createUrlTree([""]))
  } 
  return groupService.addUserToGroup(groupId).pipe(
    map(() =>  router.createUrlTree([""])),
    catchError(() => of(router.createUrlTree([""])))
  );
};
