import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CoinsService } from 'src/app/Services/coins.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [CoinsService]
})
export class TableComponent implements OnInit {
  [x:string]:any;
  
  public tableForm:FormGroup | undefined;
  public resultCrypto:any[]=[];
  public resultCryptoSelect:any[]=[];
  public resultCryptoEUR:any[]=[];
  public resultCryptoCOP:any[]=[];
  public resultCryptoToday:any[]=[];
  public dates:any[]=[];

  constructor(private serviceCoins: CoinsService) { }

  ngOnInit(): void {
    this.getDates();
    this.priceToday();
    this.getInfoCoinToday();
  }

  getDates(){ // Get dates and applied a format to them
    for (let i = 0; i < 15; i++) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - i);
      const newDate = new DatePipe('en-CO').transform(yesterday, 'yyyy-MM-dd');
      this.dates.push(newDate)
    }
    this.getInfoCoin();
  }

  getInfoCoinToday(){  // call the api every 60 seconds
    setInterval(this.priceToday, 60000);
  }

  priceToday(){ // call the api to get the price of today
    const today = new Date();
    const newDate = new DatePipe('en-CO').transform(today, 'yyyy-MM-dd');
    this.serviceCoins.getCrypto(newDate? newDate : "").subscribe(result => {
      console.log(result[0]);
      this.resultCryptoToday.push(Object.assign(result[0], {date:newDate}));
    });
  }

  getInfoCoin(){ // call the api to get the prices 
    for (let i = 0; i < this.dates.length; i++) {
      this.serviceCoins.getCrypto(this.dates[i]).subscribe(result => {
        console.log(result[0]);
        this.resultCrypto.push(Object.assign(result[0], {date:this.dates[i]}));
      });
    }
    this.getInfoCoinToday();
  }

  selectCoin(target: any){ // call the api to get the prices of the selection date
    this.resultCryptoSelect = [];
    this.resultCryptoEUR = [];
    this.resultCryptoCOP = [];

    let info = {target};
    let date = info.target.innerText;
    let endDate = date.substring(6,16);

    this.serviceCoins.getCrypto(endDate).subscribe(result => {
      console.log(result[0]);
      this.resultCryptoSelect.push(Object.assign(result[0], {date:endDate}));
    });
    this.serviceCoins.getCryptoEUR(endDate).subscribe(result => {
      console.log(result[0]);
      this.resultCryptoEUR.push(Object.assign(result[0], {date:endDate}));
    });
    this.serviceCoins.getCryptoCOP(endDate).subscribe(result => {
      console.log(result[0]);
      this.resultCryptoCOP.push(Object.assign(result[0], {date:endDate}));
    });
  }

  buttonDate(){
    const date = new FormControl('',[]);
    this.tableForm = new FormGroup({
      date:date,
    })
  }
}
