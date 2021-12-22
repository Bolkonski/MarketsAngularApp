import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-market-create',
  templateUrl: './market-create.component.html',
  styleUrls: ['./market-create.component.css']
})
export class MarketCreateComponent implements OnInit {
  today: Date;
  thisYear: number;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private service: MarketService) { }

  ngOnInit(): void {
    this.today=new Date();
    this.thisYear=this.today.getFullYear();
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      symbol: ['', [Validators.required]],
      country: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      ipoYear: [0, [Validators.required]],
      marketCap: [0, [Validators.required]],
      sector: ['', [Validators.required]],
      volume: [0, [Validators.required]],
      netChange: [0, [Validators.required]],
      netChangePercent: [0, [Validators.required]],
      lastPrice: [0, [Validators.required]]
    });
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  numberKeypress(event: any): boolean {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.service.addMarket({
      name: this.formGroup.controls['name'].value,
      symbol: this.formGroup.controls['symbol'].value,
      country: this.formGroup.controls['country'].value,
      industry: this.formGroup.controls['industry'].value,
      ipoYear: this.formGroup.controls['ipoYear'].value,
      marketCap: this.formGroup.controls['marketCap'].value,
      sector: this.formGroup.controls['sector'].value,
      volume: this.formGroup.controls['volume'].value,
      netChange: this.formGroup.controls['netChange'].value,
      netChangePercent: this.formGroup.controls['netChangePercent'].value,
      lastPrice: this.formGroup.controls['lastPrice'].value,
      id: 0,
      createdAt: this.today.toString(),
      updatedAt: this.today.toString()
    }).subscribe(()=>{alert('created')});
  }
}
