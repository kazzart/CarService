import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateModalService {
  public title: string = '';
  public addToVisible: boolean = false;
  public addManagerVisible: boolean = false;

  constructor() {}

  addTo() {
    this.addToVisible = true;
    this.title = 'Добавление ТО';
  }

  addManager() {
    this.addManagerVisible = true;
    this.title = 'Добавление менеджера';
  }

  close() {
    this.addToVisible = false;
    this.addManagerVisible = false;
    this.title = '';
  }
}
