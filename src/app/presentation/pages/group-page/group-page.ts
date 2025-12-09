import { Component } from '@angular/core';
import { GroupVM } from '../../viewModels/groupVM';
import { GroupStateService } from '../../services/group-state-service';
import { Group } from '../../../domain/models/Group';
import { SecretSantaService } from '../../services/secret-santa-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../domain/models/User';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SecretSantaComponent } from '../../components/secret-santa-component/secret-santa-component';

@Component({
  selector: 'app-group-page',
  imports: [AsyncPipe],
  templateUrl: './group-page.html',
  styleUrl: './group-page.scss',
  providers:[GroupVM]
})
export class GroupPage {
  private _group: Group;
  groupName$: Observable<string>;
  members$: Observable<User[]>;
  admin$: Observable<User>;
  private _linkAdd = new BehaviorSubject<string>("");
  linkAdd$ : Observable<string> = this._linkAdd.asObservable();
  private _disabled = new BehaviorSubject<boolean>(false);
  disabled$ : Observable<boolean> = this._disabled.asObservable();
  private _showing = new BehaviorSubject<boolean>(false);
  showing$ : Observable<boolean> = this._showing.asObservable();
  private _buttonText = new BehaviorSubject<string>("Generar asignaciones");
  buttonText$ = this._buttonText.asObservable();
  private _hasAssignations = new BehaviorSubject<boolean>(false);
  hasAssignations$ = this._hasAssignations.asObservable();
  
  constructor(private groupViewModel: GroupVM, private groupStateService: GroupStateService, private secretSantaService: SecretSantaService,private authService: AuthService, private clipboard:Clipboard,private router:Router,private dialog: MatDialog){
    this.group = groupStateService.selectedGroup;
    this.groupViewModel.loadGroup(this.group);
    this.groupName$ = this.groupViewModel.name$
    this.admin$ = this.groupViewModel.admin$
    this.members$ = this.groupViewModel.members$
    this._linkAdd.next(window.location.href+`/join/${this.group.id}`)
    this._showing.next(this.groupViewModel.members.length >= 2)
    this.secretSantaService.hasAssignations(this.group.id).subscribe({
      next:(res)=>{
        this._hasAssignations.next(res);
        this._disabled.next(res);
        this._buttonText.next("¡Asignaciones Generadas!"); 
      },
      error:()=>{
        this._hasAssignations.next(false);
      }
    });
  }

  get group(): Group {
    return this._group;
  }

  set group(value: Group) {
    this._group = value;
    this.groupViewModel.loadGroup(this._group);
  }
  getFirstChar(user: User): string{
    return user.username.charAt(0).toUpperCase();
  }
  getMyUserId(){
    return this.authService.getCurrentUser().id;
  }
  copyToClipboard(){
    this.clipboard.copy(window.location.href+`/join/${this.group.id}`);
  }
  generateSecretSantas(){
    this.secretSantaService.generateSecretSantasForGroup(this.group.id).subscribe({
      next:()=> {
        this._buttonText.next("¡Asignaciones Generadas!"); 
        this._disabled.next(true)
        this.secretSantaService.hasAssignations(this.group.id).subscribe({
          next:(res)=>{
            this._hasAssignations.next(res);
          },
          error:()=>{
            this._hasAssignations.next(false);
          }
         });
      }
    });
  }
  routeToMyAssigments(){
    this.router.navigate([`/group/myAssigments`]);
  }
  openDialog(){
    const dialogRef = this.dialog.open(SecretSantaComponent,{
      panelClass:"secret-santa-panel",
      width:"420px",
    });
  }
}
