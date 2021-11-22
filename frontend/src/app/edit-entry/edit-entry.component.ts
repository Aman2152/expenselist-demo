import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ExpenseEntry } from '../expense-entry';
import { ExpenseEntryService } from '../expense-entry.service';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
   selector: 'app-edit-entry',
   templateUrl: './edit-entry.component.html',
   styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit {

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
      console.log("edit-entry");
      this.formData = new FormGroup({
         id: new FormControl(),
         item: new FormControl('', [Validators.required]),
         amount: new FormControl('', [Validators.required]),
         category: new FormControl(),
         location: new FormControl(),
         spendOn: new FormControl()
      });

      this.selectedId = Number(this.route.snapshot.paramMap.get('id'));

      this.expenseEntryService.getExpenseEntry(this.selectedId)
            .subscribe((data: ExpenseEntry) => {
               this.expenseEntry = data;
               this.formData.controls['id'].setValue(this.expenseEntry.id);
               this.formData.controls['item'].setValue(this.expenseEntry.item);
               this.formData.controls['amount'].setValue(this.expenseEntry.amount);
               this.formData.controls['category'].setValue(this.expenseEntry.category);
               this.formData.controls['location'].setValue(this.expenseEntry.location);


               this.formData.controls['spendOn'].setValue(this.expenseEntry.spendOn);
            })

   }

   get itemValue() {
      return this.formData.get('item');
   }

   get amountValue() {
      return this.formData.get('amount');
   }

   onClickSubmit(data: any) {
      console.log('onClickSubmit fired');
      console.log("The updated submitted data");


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
      };

      console.log(expenseEntry);

      this.expenseEntryService.updateExpenseEntry(expenseEntry)
         .subscribe((data: any) => {
            this.router.navigate(['/expenses']);
         });
   }
}
