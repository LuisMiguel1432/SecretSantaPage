import { Component, signal, Signal } from '@angular/core';
import { GroupVM } from '../../viewModels/groupVM';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-group-creation',
  imports: [MatFormFieldModule,ReactiveFormsModule,MatInputModule,AsyncPipe],
  templateUrl: './group-creation.html',
  styleUrl: './group-creation.scss',
  providers:[GroupVM]
})
export class GroupCreation {

  readonly nameControl = new FormControl("",[Validators.required, Validators.minLength(3)])

  errorMessage=signal('');

  name$: Observable<string>;
  get groupName(){
    return this.groupVM.groupName;
  }
  set groupName(groupName:string){
    this.groupVM.groupName = groupName;
  }

  error$: Observable<string | null>;
  loading$: Observable<boolean>;
  success$:Observable<boolean>;

  constructor(private groupVM: GroupVM,private dialogRef: MatDialogRef<GroupCreation>) {
    this.name$=this.groupVM.name$;
    this.error$ = this.groupVM.error$;
    this.loading$ = this.groupVM.loading$;
    this.success$ = this.groupVM.success$;
  }


  onGroupCreationClick(){
    if(this.nameControl.invalid) return;
    this.groupName = this.nameControl.value;
    this.loading$.subscribe();
    this.groupVM.createGroup();
    this.error$.subscribe(value =>{
      if(value){
        this.updateErrorMesage();
      }
    })
    this.success$.subscribe(value=>{
      if(value)
        this.dialogRef.close(true);
    });
  }

  updateErrorMesage(){
    if(this.nameControl.invalid){
      this.errorMessage.set("Escribe un nombre valido");
    }else{
      this.errorMessage.set("Ocurrio un error al crear el grupo, intentelo mas tarde");
    }
  }
}
