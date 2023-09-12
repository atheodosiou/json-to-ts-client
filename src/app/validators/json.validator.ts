import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function isValidJson(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    try {
      const value = JSON.parse(control.value);
      if (typeof value === 'object' && value !== null) {
        return null; // Valid JSON
      } else {
        return { invalidJson: true }; // Invalid JSON
      }
    } catch (error) {
      return { invalidJson: true }; // Invalid JSON
    }
  };
}
