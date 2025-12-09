import { computed, Injectable, signal } from '@angular/core';
import { Group } from '../../domain/models/Group';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class GroupStateService {
  private _selectedGroupSignal = signal<Group | null>(null);
  
  selectedGroupSignal = this._selectedGroupSignal.asReadonly();

  hasSelectedGroup = computed(() =>this.selectedGroup !== null);

   

  constructor(private router: Router) {}

  set selectedGroup(group: Group) {
    this._selectedGroupSignal.set(group);
    sessionStorage.setItem("selectedGroup",group.id.toString())
  }
  //esto sirve para por si no pasaras el objeto entero, permite que todas las propiedades sean ? y poner solo las que pasamos en el partial 
  // (no seria necesario ya que pasamos el objeto entero, no sera usado por ello ademas de que tenemos para eso el set)
  updateSelectedGroup(updates: Partial<Group>) {
    const current = this.selectedGroupSignal();
    if (current) {
      this._selectedGroupSignal.set({ ...current, ...updates });
    }
  }

  navigateToGroupDetail(group: Group) {
    this.selectedGroup = group;
    
    this.router.navigate(['/group']);
  }

  // Limpiar selección
  clearSelectedGroup() {
    this._selectedGroupSignal.set(null);
  }

  // Obtener valor actual directamente
  get selectedGroup(): Group | null {
    return this.selectedGroupSignal();
  }

  
}
