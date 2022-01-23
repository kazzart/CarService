import { Component, OnInit } from '@angular/core';
import { To } from 'src/app/Interfaces/to';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {
  public to: To | undefined;

  constructor() {}

  ngOnInit(): void {
    this.to = {
      id: 10,
      sts_id: 111,
      sts: {
        id: 111,
        ser: '77AA',
        number: '132421',
        client_id: 9,
        client: {
          id: 9,
          first_name: 'Артем',
          second_name: 'Сергеев',
          middle_name: 'Анастасович',
          tel_number: 89859716500,
        },
        car_plate: 'Е999КХ777',
        vin: 'asdfghjkl;123456',
        model: 'Lada Kalina',
      },
      date: '02-01-2022',
      status_id: 2,
      status: { id: 999, name: 'Готово' },
    };
  }
}
