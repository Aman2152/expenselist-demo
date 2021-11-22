export class User {
  fullName: string;
  email: string;
  username: string;
  mobile: string;
  password: string;
  termsAndConditions: boolean;

  constructor(
    fullName: string,
    email: string,
    username: string,
    mobile: string,
    password: string,
    termsAndConditions: boolean) {
    this.fullName = fullName;
    this.email = email;
    this.username = username;
    this.mobile = mobile;
    this.password = password;
    this.termsAndConditions = termsAndConditions;
  }
}
