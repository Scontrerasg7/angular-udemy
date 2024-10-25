import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {
  // /////// cualquiera de las dos opciones
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });
  // //////////////////////////////////////

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  ) { }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field)
  }

  getFieldError(field: string): string | null{
    if (!this.myForm.controls[field]) return null

    const errors = this.myForm.controls[field].errors || {};
    for (const key in errors) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field must have a minimum length of ${errors[key].requiredLength}`;
        case 'min':
          return 'This field must have a value greater than 0';
        default:
          return null
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };
    console.log(this.myForm.value);
    this.myForm.reset({price: 10, inStorage: 0})
  }
}
