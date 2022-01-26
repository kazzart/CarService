import { Component, Input, OnInit } from '@angular/core';
import { To } from 'src/app/Interfaces/to';
import { StateModalService } from 'src/app/Shared/state-modal.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/Interfaces/status';
import { AuthService } from 'src/app/Shared/auth.service';
import { Router } from '@angular/router';
import { Manager } from 'src/app/Interfaces/manager';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.scss'],
})
export class ManagerPageComponent implements OnInit {
  public tos: To[] = [];
  public manager: Manager | undefined;

  constructor(
    public state: StateModalService,
    public auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.isAuthorzed.subscribe((data) => {
      if (data === false) {
        this.router.navigate(['/login']);
      }
      if (data == true) {
        this.getManagerFromToken();
      }
    });
    this.get_tos();
    this.state.toChanged.subscribe((data) => {
      for (let i = 0; i < this.tos.length; i++) {
        if (this.tos[i].id === data.id) {
          this.tos[i] = data;
          break;
        }
      }
    });
  }

  public addToModal() {
    this.state.addTo();
  }

  public addManagerModal() {
    this.state.addManager();
  }

  public logout() {
    this.auth.logOut();
    this.manager = undefined;
    this.router.navigate(['/login']);
  }

  private get_tos(): void {
    this.http.get<To[]>(environment.url + '/to/all').subscribe((data) => {
      this.tos = data;
    });
  }

  private getManagerFromToken(): void {
    this.http
      .get<Manager>(environment.url + '/manager/', {
        headers: this.auth.getTokenHeader(),
      })
      .subscribe((data) => {
        this.manager = data;
        console.log(this.manager);
      });
  }
}
