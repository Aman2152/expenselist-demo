import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ExpenseEntry } from '../expense-entry';
import { ExpenseEntryService } from '../expense-entry.service';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
   selector: 'app-add-entry',
   templateUrl: './add-entry.component.html',
   styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {

   id!: number;
   item!: string;
   amount!: number;
   category!: string;
   location!: string;
   spendOn!: Date;

   formData!: FormGroup;
   selectedId!: number;
   expenseEntry!: ExpenseEntry;

   //expenseEntryService: any;

   constructor(private expenseEntryService: ExpenseEntryService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {
      console.log("add-entry");
      this.formData = new FormGroup({
         id: new FormControl(),
         item: new FormControl('', [Validators.required]),
         amount: new FormControl('', [Validators.required]),
         category: new FormControl(),
         location: new FormControl(),
         spendOn: new FormControl()
      });
   }

   get itemValue() {
      return this.formData.get('item');
   }

   get amountValue() {
      return this.formData.get('amount');
   }

   onClickSubmit(data: any) {
      console.log('onClickSubmit fired');
      this.id = data.id;
      this.item = data.item;
      this.amount = data.amount;
      this.category = data.category;
      this.location = data.location;
      this.spendOn = data.spendOn;

      let expenseEntry: ExpenseEntry = {
         id: this.id,
         item: this.item,
         amount: this.amount,
         category: this.category,
         location: this.location,
         spendOn: this.spendOn,
         createdOn: new Date(2020, 5, 20)
      }
      console.log(expenseEntry);

      this.expenseEntryService.addExpenseEntry(expenseEntry)
            .subscribe((data: any) => { 
               console.log(data); 
               this.router.navigate(['/expenses']); 
            });

      // if (!this.edit) {
      //    console.log('add fn fired');
         
      // } else {
      //    console.log('edit fn fired');
      //    this.expenseEntryService.updateExpenseEntry(expenseEntry)
      //       .subscribe((data: any) => { console.log(data); this.router.navigate(['/expenses']); });
      // }
   }
}
