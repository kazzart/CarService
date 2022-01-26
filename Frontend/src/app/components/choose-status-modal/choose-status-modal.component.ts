import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Status } from 'src/app/Interfaces/status';
import { To } from 'src/app/Interfaces/to';
import { StateModalService } from 'src/app/Shared/state-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-choose-status-modal',
  templateUrl: './choose-status-modal.component.html',
  styleUrls: ['./choose-status-modal.component.scss'],
})
export class ChooseStatusModalComponent implements OnInit {
  public statuses: Status[] = [];

  public to: To | undefined;

  constructor(public state: StateModalService, private http: HttpClient) {}

  ngOnInit(): void {
    this.get_statuses();
    this.state.toModalChanged.subscribe((data) => {
      this.to = data;
    });
  }

  close() {
    this.state.close();
  }

  public choose_status(status_id: number, to: To) {
    this.http
      .patch<To>(environment.url + '/to/' + to.id, {
        status_id: status_id,
      })
      .subscribe((data) => {
        this.state.toChanged.next(data);
      });
    this.close();
  }

  private get_statuses(): void {
    this.http
      .get<Status[]>(environment.url + '/status/all')
      .subscribe((data) => {
        this.statuses = data;
      });
  }
}
