import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StateModalService } from 'src/app/Shared/state-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-manager-modal',
  templateUrl: './add-manager-modal.component.html',
  styleUrls: ['./add-manager-modal.component.scss'],
})
export class AddManagerModalComponent implements OnInit {
  public login_field: string = '';
  public password_field: string = '';

  constructor(public state: StateModalService, public http: HttpClient) {}

  ngOnInit(): void {}

  public addManager(login: string, password: string): void {
    this.http
      .post(environment.url + '/manager/sign_up/', {
        login: login,
        password: password,
        is_admin: false,
      })
      .subscribe();
    this.state.close();
  }

  close() {
    this.state.close();
  }
}
