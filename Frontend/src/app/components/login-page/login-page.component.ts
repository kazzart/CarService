import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public login_field: string = '';
  public password_field: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isAuthorzed.subscribe((data) => {
      if (data === true) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    console.log(this.login_field);
    this.auth.signIn(this.login_field, this.password_field);
    // this.router.navigate(['/']);
  }
}
