import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {

   title = 'Aman Expense Manager';
   isUserLoggedIn = false;
   userEmail: string | null;
   private authListnerSubs: Subscription;
   // userDisplayName: string | null;

   constructor(private authService: AuthService) { }

   ngOnInit() {
      this.authService.autoAuthUser();
      this.isUserLoggedIn = this.authService.getIsAuth();
      this.userEmail = this.authService.getUserEmail();
      this.authListnerSubs = this.authService.getAuthStatusListener()
         .subscribe((isAuthenticated) => {
            this.isUserLoggedIn = isAuthenticated;
            this.userEmail = this.authService.getUserEmail();
            console.log(this.userEmail);
            
            // sessionStorage.setItem('loggedUser', data.Username);
            // this.userDisplayName = sessionStorage.getItem('loggedUser');
         })
   }
   onLogout() {
      this.authService.logout();
   }
   ngOnDestroy() {
      this.authListnerSubs.unsubscribe();
   }
}
