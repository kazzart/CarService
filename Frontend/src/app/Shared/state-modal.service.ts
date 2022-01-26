import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { To } from '../Interfaces/to';

@Injectable({
  providedIn: 'root',
})
export class StateModalService {
  public title: string = '';

  public addToVisible: boolean = false;

  public addManagerVisible: boolean = false;

  public chooseStatusVisible: boolean = false;
  public toChanged: Subject<To> = new Subject<To>();
  public toModalChanged: Subject<To> = new Subject<To>();
  public toAdded: Subject<void> = new Subject<void>();

  constructor() {}

  addTo() {
    this.addToVisible = true;
    this.title = 'Добавление ТО';
  }

  addManager() {
    this.addManagerVisible = true;
    this.title = 'Добавление менеджера';
  }

  chooseStatus(to: To) {
    this.chooseStatusVisible = true;
    this.title = 'Выбрать статус';
    this.toModalChanged.next(to);
  }

  close() {
    this.addToVisible = false;
    this.addManagerVisible = false;
    this.chooseStatusVisible = false;
    this.title = '';
  }
}
