import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loading = signal<boolean>(false);
  setLoading(state: boolean) {
    this.loading.set(state);
  }
}
