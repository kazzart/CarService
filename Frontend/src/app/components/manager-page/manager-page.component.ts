import { Component, Input, OnInit } from '@angular/core';
import { StateModalService } from 'src/app/Shared/state-modal.service';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss'],
})
export class ManagerPageComponent implements OnInit {
  @Input() isAdmin = true;

  constructor(public state: StateModalService) {}

  ngOnInit(): void {}

  addTo() {
    this.state.addTo();
  }

  addManager() {
    this.state.addManager();
  }
}
