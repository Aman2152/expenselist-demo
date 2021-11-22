export interface AuthData {
  token: string;
  userId: string;
  email: string | null;
  expirationDate: Date;
}
