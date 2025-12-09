import { Component } from '@angular/core';
import { BehaviorSubject, mergeMap } from 'rxjs';
import { Group } from '../../../domain/models/Group';
import { GroupService } from '../../services/group-service';
import { AuthService } from '../../services/auth-service';
import { GroupInList } from '../group-in-list/group-in-list';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { GroupCreation } from '../group-creation/group-creation';

@Component({
  selector: 'app-group-list',
  imports: [GroupInList,AsyncPipe],
  templateUrl: './group-list.html',
  styleUrl: './group-list.scss',
})
export class GroupList {

  private _groups = new BehaviorSubject<Group[] | null>([]);
  groups$ = this._groups.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  private _error = new BehaviorSubject<string | null>(null);
  error$ = this._error.asObservable();

   constructor(
    private groupService: GroupService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadGroups();
  }

  openDialog(){
    const dialogRef = this.dialog.open(GroupCreation,{
      panelClass:"panel",
      width:"420px",
    });
    
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.loadGroups();
      }
    })
  }

  loadGroups() {
    this._loading.next(true);
    this.groupService.findGroupByUserId().subscribe({
      next: (groups) => {
            console.log(groups);
            this._loading.next(false);
            this._groups.next(groups);
        },
        error: (err) => {
            console.log(err);
            this._error.next(err);
            this._loading.next(false);
        }
    })
  }


 

}
