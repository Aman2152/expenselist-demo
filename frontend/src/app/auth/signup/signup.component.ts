import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {User} from "../user.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public isLoading = false;
  public isPasswordHidden = true;
  public isConfirmPasswordHidden = true;
  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit(): void {
    if (this.authService.getIsAuth())
      this.router.navigate(['/']);
  }

  public onSignup(form: NgForm) {
    if (form.invalid)
      return;
    // if (form.value.password === form.value.confirmPassword)
    // console.log(form);
    const user = new User(
      form.value.fullName,
      form.value.email,
      form.value.username,
      form.value.mobile,
      form.value.password,
      form.value.termsAndConditions,
    );

    this.authService.createUser(user);
  }

  public togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  public toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordHidden = !this.isConfirmPasswordHidden;
  }

}
