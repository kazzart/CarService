import { Component, OnInit } from '@angular/core';
import { StateModalService } from 'src/app/Shared/state-modal.service';

@Component({
  selector: 'app-add-manager-modal',
  templateUrl: './add-manager-modal.component.html',
  styleUrls: ['./add-manager-modal.component.scss'],
})
export class AddManagerModalComponent implements OnInit {
  constructor(public state: StateModalService) {}

  ngOnInit(): void {}

  close() {
    this.state.close();
  }
}
