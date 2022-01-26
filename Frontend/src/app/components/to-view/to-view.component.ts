import { Component, Input, OnInit } from '@angular/core';
import { To } from 'src/app/Interfaces/to';

@Component({
  selector: 'app-to-view',
  templateUrl: './to-view.component.html',
  styleUrls: ['./to-view.component.scss'],
})
export class ToViewComponent implements OnInit {
  @Input() tos: To[] = [];

  constructor() {}

  ngOnInit(): void {}
}
