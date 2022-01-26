import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { To } from 'src/app/Interfaces/to';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {
  public to: To | undefined;
  public to_id: number = -1;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.to_id = +(<string>this.route.snapshot.queryParamMap.get('id'));
    this.http
      .get<To>(environment.url + '/to/' + this.to_id)
      .subscribe((data) => {
        this.to = data;
      });
  }
}
