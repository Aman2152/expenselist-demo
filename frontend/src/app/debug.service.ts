import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DebugService {
  //info: any;

  constructor() { }
  info(message : String) : void {     
    console.log(message); 
 } 
}
