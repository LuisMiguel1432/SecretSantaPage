import { Component, Input } from '@angular/core';
import { GroupVM } from '../../viewModels/groupVM';
import { Group } from '../../../domain/models/Group';
import { Observable } from 'rxjs';
import { User } from '../../../domain/models/User';
import { AsyncPipe } from '@angular/common';
import { GroupStateService } from '../../services/group-state-service';

@Component({
  selector: 'app-group-in-list',
  imports: [AsyncPipe],
  templateUrl: './group-in-list.html',
  styleUrl: './group-in-list.scss',
  providers:[GroupVM]
})
export class GroupInList {
 constructor(private groupViewModel: GroupVM, private groupStateService: GroupStateService){}
 private _group! : Group;
 
 groupName$:Observable<string>;
 admin$:Observable<User>;
 members$:Observable<User[]>;

@Input()
set group(group:Group){
  this._group = group;
  this.groupViewModel.loadGroup(this._group);
  this.groupName$ = this.groupViewModel.name$;
  this.admin$ = this.groupViewModel.admin$;
  this.members$ = this.groupViewModel.members$;
}

 getFirstLetter():string{
  return this.groupViewModel.groupName.charAt(0).toUpperCase();
 }

 onGroupClick(){
  this.groupStateService.navigateToGroupDetail(this._group);
 }
 
}
