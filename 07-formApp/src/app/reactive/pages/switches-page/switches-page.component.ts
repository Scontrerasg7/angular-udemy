import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

enum Genre {
  radioMasculino = 'M',
  radioFemenino = 'F',
}

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {
  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotification: [true, Validators.required],
    termsAndConditions: [true, Validators.requiredTrue],
  })
  public person = {
    gender: 'F',
    wantNotification: false
  }

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  ) { }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field)
  }

  // ngSubmit
  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.myForm.value;
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);

  }
}
