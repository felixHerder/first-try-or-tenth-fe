import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ToFormControls<T> = {
  [K in keyof T]: T[K] extends Array<infer R>
    ? FormArray<T[K] extends object ? FormGroup<ToFormControls<R>> : FormControl<R>>
    : T[K] extends object
      ? FormGroup<ToFormControls<T[K]>>
      : FormControl<T[K]>;
};
