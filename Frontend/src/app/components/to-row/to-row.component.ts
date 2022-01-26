import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/Interfaces/status';
import { To } from 'src/app/Interfaces/to';
import { StateModalService } from 'src/app/Shared/state-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-to-row',
  templateUrl: './to-row.component.html',
  styleUrls: ['./to-row.component.scss'],
})
export class ToRowComponent implements OnInit {
  @Input() to: To | undefined;
  @Input() index: number = 0;

  public isExpanded: boolean = false;

  constructor(public state: StateModalService, private http: HttpClient) {}

  ngOnInit(): void {}

  public toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  chooseStatus(to: To) {
    this.state.chooseStatus(to);
  }

  public get_to_url() {
    navigator.clipboard.writeText(
      'http://localhost:4200/client?id=' + this.to?.id
    );
  }
}
