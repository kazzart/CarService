import { Component, Input, OnInit } from '@angular/core';
import { To } from 'src/app/Interfaces/to';

@Component({
  selector: 'app-to-row',
  templateUrl: './to-row.component.html',
  styleUrls: ['./to-row.component.scss'],
})
export class ToRowComponent implements OnInit {
  @Input() to: To | undefined;
  @Input() index: number = 0;

  isExpanded: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  chooseStatus() {}

  copyLink() {}
}
