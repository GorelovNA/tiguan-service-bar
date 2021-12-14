import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  protected destroy$: Subject<void> = new Subject();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
