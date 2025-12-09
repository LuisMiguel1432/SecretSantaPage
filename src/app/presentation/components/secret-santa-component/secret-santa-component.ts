import { AsyncPipe } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SecretSantaService } from '../../services/secret-santa-service';
import { SecretSantaVM } from '../../viewModels/SecretSantaVM';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
 
@Component({
  selector: 'app-secret-santa-component',
  imports: [AsyncPipe,MatProgressSpinner],
  templateUrl: './secret-santa-component.html',
  styleUrl: './secret-santa-component.scss',
  providers:[SecretSantaVM]
})
export class SecretSantaComponent {

  position:number = 0;
  isDragging:boolean = false;
  startY:number = 0;
  private _load = new BehaviorSubject<boolean>(false);
  load$ = this._load.asObservable();
  receiver$ :Observable<String>;
  loading$:Observable<boolean>;
  constructor(private secretSantaVM:SecretSantaVM){
    secretSantaVM.loadSecretSantaForGiver();
    this.receiver$ = secretSantaVM.receiverName$;
    this.loading$ = secretSantaVM.loading$;
  }

  onMouseDown(event:MouseEvent){
    this.isDragging=true;
    this.startY = event.clientY - this.position;
    event.preventDefault();
  }
  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event:MouseEvent){
    
    if(!this.isDragging){
      return;
    }
    const newPosition = event.clientY-this.startY
    if(newPosition<=0)
      this.position=newPosition;
  }
  @HostListener('window:mouseup')
  onMouseUp(){
    if(!this.isDragging) return;
    this.isDragging = false;
    this.position=0;
  }
 

  onTouchStart(event: TouchEvent): void {
    console.log("adasdasd");
    
    this.isDragging = true;
    this.startY = event.touches[0].clientY - this.position;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    const newPosition = event.touches[0].clientY - this.startY;
    
    if (newPosition <= 0) {
      this.position = newPosition;
    }
  }

  onTouchEnd(): void {
    this.onMouseUp();
  }

  getTransform(): string {
    
    return `translateY(${this.position}px)`;
  }

  onLoad(){
    this._load.next(true);
    console.log("cargado")
  }
}
