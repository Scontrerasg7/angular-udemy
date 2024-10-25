import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  })

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  ) { }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

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

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorite(i: number): void {
    this.favoriteGames.removeAt(i);
  }

  isValidFieldInArray( formArray: FormArray , i: number) {
    return formArray.controls[i].errors
      && formArray.controls[i].touched;
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    this.myForm.reset()
  }
}
