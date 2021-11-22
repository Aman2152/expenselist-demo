import { Component, OnInit } from '@angular/core';
import { ExpenseEntry } from '../expense-entry';
import { ExpenseEntryService } from '../expense-entry.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'; 


@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css']
})
export class ExpenseEntryComponent implements OnInit {
  
  title!: string; 
  expenseEntry$!: Observable<ExpenseEntry>; 
  expenseEntry: ExpenseEntry = {} as ExpenseEntry; 
  selectedId!: number; 

  constructor( private restService : ExpenseEntryService,private router : Router, private route :ActivatedRoute ) { } 

 goToEdit() {  
    this.router.navigate(['/expenses/edit', this.selectedId]); 
 }
  
 ngOnInit() {

    this.title = "Aman Expense Entry";

    this.expenseEntry$ = this.route.paramMap.pipe( 
      switchMap(params => { 
         this.selectedId = Number(params.get('id')); 
         return this.restService.getExpenseEntry(this.selectedId); })); 
   this.expenseEntry$.subscribe( (data) => this.expenseEntry = data ); 
   } 
   goToList() { 
      this.router.navigate(['/expenses']); 
   } 
    
   
  }
  
  

    