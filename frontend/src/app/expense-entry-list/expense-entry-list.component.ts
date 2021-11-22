import { Component, OnInit } from '@angular/core';
import { ExpenseEntry } from '../expense-entry';
import { DebugService } from '../debug.service';
import { ExpenseEntryService } from '../expense-entry.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-expense-entry-list',
    templateUrl: './expense-entry-list.component.html',
    styleUrls: ['./expense-entry-list.component.css'],
    providers: [DebugService]
})
export class ExpenseEntryListComponent implements OnInit {

    title!: string;
    expenseEntries!: ExpenseEntry[];
    ExpenseEntries!: ExpenseEntry[];
    isUserLoggedIn = false;
    //restService: any;
    selectedId: any;

    constructor(
        private debugService: DebugService, 
        private restService: ExpenseEntryService,
        private authService: AuthService,
        private router: Router) { }


    ngOnInit() {
        this.isUserLoggedIn = this.authService.getIsAuth();
        if(!this.isUserLoggedIn) {
            this.router.navigate(['/']);
        }
        this.debugService.info("Expense Entry List component initialized");
        this.title = "Aman Expense Entry List";
        //this.expenseEntries = this.getExpenseEntries();
        this.getExpenseItems();

    }

    getExpenseItems() {
        this.restService.getExpenseEntries()
            .subscribe((data: any) => {
                this.expenseEntries = data.expenses;
                console.log(data.expenses);
            });
    }

    deleteExpenseEntry(evt: { preventDefault: () => void; }, _id: any) {
        evt.preventDefault();
        if (confirm("Are you sure to delete the entry?")) {
            this.restService.deleteExpenseEntry(_id)
                .subscribe((data: any) => console.log(data));

            this.getExpenseItems();
        }
    }


}


