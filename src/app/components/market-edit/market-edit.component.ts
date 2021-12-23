import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Market } from 'src/app/models/market';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-market-edit',
  templateUrl: './market-edit.component.html',
  styleUrls: ['./market-edit.component.css']
})
export class MarketEditComponent implements OnInit {
  today: Date;
  formGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Market,
  public dialogRef: MatDialogRef<MarketEditComponent>, 
  private fb: FormBuilder, private service: MarketService) { }

  ngOnInit(): void {
    this.today=new Date();
    this.formGroup = this.fb.group({
      name: [this.data.name, [Validators.required]],
      symbol: [this.data.symbol, [Validators.required]],
      country: [this.data.country, [Validators.required]],
      industry: [this.data.industry, [Validators.required]],
      ipoYear: [this.data.ipoYear, [Validators.required]],
      marketCap: [this.data.marketCap, [Validators.required]],
      sector: [this.data.sector, [Validators.required]],
      volume: [this.data.volume, [Validators.required]],
      netChange: [this.data.netChange, [Validators.required]],
      netChangePercent: [this.data.netChangePercent, [Validators.required]],
      lastPrice: [this.data.lastPrice, [Validators.required]]
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
    this.service.updateMarket({
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
      id: this.data.id,
      createdAt: this.data.createdAt,
      updatedAt: this.today.toString()
    }).subscribe(()=>{
      this.dialogRef.close();
    });
  }
}
