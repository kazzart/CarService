import { Component, OnInit } from '@angular/core';
import { StateModalService } from 'src/app/Shared/state-modal.service';

@Component({
  selector: 'app-add-to-modal',
  templateUrl: './add-to-modal.component.html',
  styleUrls: ['./add-to-modal.component.scss'],
})
export class AddToModalComponent implements OnInit {
  constructor(public state: StateModalService) {}

  ngOnInit(): void {}

  close() {
    this.state.close();
  }
}
