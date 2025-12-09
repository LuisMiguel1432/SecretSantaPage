import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('repeatPassword')?.value;
  return password === confirm ? null : { passwordsDontMatch: true };
}