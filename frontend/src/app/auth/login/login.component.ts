import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {invalid} from "@angular/compiler/src/render3/view/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isLoading = false;
  public isPasswordHidden = true;

  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    // Redirecting authorized users to home page
    if (this.authService.getIsAuth())
      this.router.navigate(['/']);

  }

  public onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }

  public togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }
}
