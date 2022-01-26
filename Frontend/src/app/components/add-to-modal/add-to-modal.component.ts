import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Interfaces/client';
import { Sts } from 'src/app/Interfaces/sts';
import { To } from 'src/app/Interfaces/to';
import { AuthService } from 'src/app/Shared/auth.service';
import { StateModalService } from 'src/app/Shared/state-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-to-modal',
  templateUrl: './add-to-modal.component.html',
  styleUrls: ['./add-to-modal.component.scss'],
})
export class AddToModalComponent implements OnInit {
  public second_name: string = '';
  public first_name: string = '';
  public middle_name: string = '';
  public tel_number: string = '';
  public car_plate: string = '';
  public model: string = '';
  public sts_ser: string = '';
  public sts_number: string = '';
  public vin: string = '';

  constructor(
    public state: StateModalService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  // public addTo(
  //   second_name: string,
  //   first_name: string,
  //   middle_name: string,
  //   tel_number: string,
  //   car_plate: string,
  //   model: string,
  //   sts_ser: string,
  //   sts_number: string,
  //   vin: string
  // ) {
  //   this.http
  //     .post(
  //       environment.url + '/to/',
  //       {
  //         second_name: second_name,
  //         first_name: first_name,
  //         middle_name: middle_name,
  //         tel_number: tel_number,
  //         car_plate: car_plate,
  //         model: model,
  //         sts_ser: sts_ser,
  //         sts_number: sts_number,
  //         vin: vin,
  //       },
  //       {
  //         headers: this.auth.getTokenHeader(),
  //       }
  //     )
  //     .subscribe();
  //   this.close();
  // }

  public close() {
    this.state.close();
  }

  private createTo(sts_id: number) {
    this.http
      .post<To>(
        environment.url + '/to',
        {
          sts_id: sts_id,
          status_id: 1,
        },
        { headers: this.auth.getTokenHeader() }
      )
      .subscribe(() => {
        this.state.toAdded.next();
        this.close();
      });
  }

  private hasSts(client_id: number) {
    let params = new HttpParams().set('car_plate', this.car_plate);
    this.http
      .get<Sts>(environment.url + '/sts/by_car_plate', { params: params })
      .subscribe({
        next: (sts) => {
          this.createTo(sts.id);
        },
        error: () => {
          this.createSts(client_id);
        },
      });
  }

  private createSts(client_id: number) {
    this.http
      .post<Sts>(
        environment.url + '/sts',
        {
          ser: this.sts_ser,
          number: this.sts_number,
          car_plate: this.car_plate,
          vin: this.vin,
          model: this.model,
          client_id: client_id,
        },
        { headers: this.auth.getTokenHeader() }
      )
      .subscribe((sts) => {
        this.createTo(sts.id);
      });
  }

  public addTo() {
    let params = new HttpParams().set('tel_number', this.tel_number);
    this.http
      .get<Client>(`${environment.url}/client/by_number`, {
        params: params,
      })
      .subscribe({
        next: (client) => {
          this.hasSts(client.id);
        },
        error: () => {
          this.http
            .post<Client>(
              environment.url + '/client',
              {
                first_name: this.first_name,
                second_name: this.second_name,
                middle_name: this.middle_name,
                tel_number: this.tel_number,
              },
              { headers: this.auth.getTokenHeader() }
            )
            .subscribe((client) => {
              this.hasSts(client.id);
            });
        },
      });
  }
}
