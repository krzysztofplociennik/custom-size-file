import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _visible = new BehaviorSubject<boolean>(false);
  visible$ = this._visible.asObservable();

  show() { 
    this._visible.next(true); 
  }

  hide() { 
    this._visible.next(false); 
  }

  constructor() { }
}
