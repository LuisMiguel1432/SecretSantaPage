import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SecretSantaService } from "../services/secret-santa-service";
import { GroupStateService } from "../services/group-state-service";

@Injectable()
export class SecretSantaVM {
  constructor(private secretSantaService: SecretSantaService, private groupStateService: GroupStateService) {}
  private _giverName = new BehaviorSubject<string>('');
  public readonly giverName$: Observable<string> = this._giverName.asObservable();
  get giverName(): string { return this._giverName.getValue(); }
  set giverName(name: string){ this._giverName.next(name); }

  private _receiverName = new BehaviorSubject<string>('');
  public readonly receiverName$: Observable<string> = this._receiverName.asObservable();
  get receiverName(): string { return this._receiverName.getValue(); }
  set receiverName(name: string){ this._receiverName.next(name); }

  private _hasReceived = new BehaviorSubject<boolean>(false);
  public readonly hasReceived$: Observable<boolean> = this._hasReceived.asObservable();
  get hasReceived(): boolean { return this._hasReceived.getValue(); }
  set hasReceived(v: boolean){ this._hasReceived.next(v); }
  
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$: Observable<boolean> = this._loading.asObservable();

  loadSecretSantaForReceiver(){
    this._loading.next(true);
    this.secretSantaService.loadSecretSantaForReceiver(this.groupStateService.selectedGroup.id).subscribe({
      next: (secretSanta) => {
        this.giverName = secretSanta.giverName;
        this.receiverName = secretSanta.receiverName;
        this.hasReceived = secretSanta.hasReceived;
        this._loading.next(false)
      },
      error: (err) => {
        console.error('Error loading Secret Santa for receiver:', err);
        this._loading.next(false);
      }
    });
  }
  

  loadSecretSantaForGiver(){
     this.secretSantaService.loadSecretSantaForGiver(this.groupStateService.selectedGroup.id).subscribe({
      next: (secretSanta) => {
        this.giverName = secretSanta.giverName;
        this.receiverName = secretSanta.receiverName;
        this.hasReceived = secretSanta.hasReceived;
      },
      error: (err) => {
        console.error('Error loading Secret Santa for giver:', err);
      }
    });
  }

}