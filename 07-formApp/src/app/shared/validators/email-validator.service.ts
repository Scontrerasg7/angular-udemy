import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of, Subscriber } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator{
  constructor() { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      console.log({email});
      if (email === "scg@halo.com") {
        subscriber.next(
          {emailTaken: true}
        )
      } else {
        subscriber.next(null)
      }
      subscriber.complete();
    }).pipe(delay(2000))


    return httpCallObservable;
  }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const emai = control.value;
  //   return of ({
  //     emailTaken: true
  //   })
  //   .pipe(delay(2000));
  // }

}
