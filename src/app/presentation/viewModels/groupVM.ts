import { inject, Injectable } from "@angular/core";
import { User } from "../../domain/models/User";
import { BehaviorSubject, merge, mergeMap } from "rxjs";
import { Group } from "../../domain/models/Group";
import { GroupService } from "../services/group-service";


@Injectable()
export class GroupVM {  
    constructor(private groupService: GroupService) {}

    private _name = new BehaviorSubject<string>('');
    name$ = this._name.asObservable();
    get groupName(): string { return this._name.value; }
    set groupName(value: string) { this._name.next(value); }

    private _admin = new BehaviorSubject<User>(null);
    admin$ = this._admin.asObservable();
    get adminName(): User { return this._admin.value; }
    set adminName(value: User) { this._admin.next(value); }

    private _members = new BehaviorSubject<User[]>([]);
    members$ = this._members.asObservable();
    get members(): User[] { return this._members.value; }
    set members(value: User[]) { this._members.next(value); }

    private _loading = new BehaviorSubject<boolean>(false);
    loading$ = this._loading.asObservable();

    private _error = new BehaviorSubject<string | null>(null);
    error$ = this._error.asObservable();

    private _success = new BehaviorSubject<boolean>(false);
    success$ = this._success.asObservable();
    get success(): boolean {
        return this._success.value;
    }
    set success(value: boolean) {
        this._success.next(value);
    }


    loadGroup(group: Group){
        this.groupName = group.groupName;
        this.adminName = group.admin;
        this.members = group.members;
    }

    createGroup(){
    this._loading.next(true);
    const newGroup: Group = {
        id: null,
        groupName: this._name.getValue(),
        admin: null,
        members: []
    };
    this._loading.next(true);
    this._error.next(null);
    this.success=false;
    
    this.groupService.createGroup(newGroup).subscribe({
        next: () => {
            this._loading.next(false);
            this.success = true
        },
        error: (err) => {
            this._error.next(err);
            this._loading.next(false);
        }
    });           
  }


}