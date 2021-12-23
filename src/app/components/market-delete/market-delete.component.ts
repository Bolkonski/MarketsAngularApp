import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Market } from 'src/app/models/market';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-market-delete',
  templateUrl: './market-delete.component.html',
  styleUrls: ['./market-delete.component.css']
})
export class MarketDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Market,
  public dialogRef: MatDialogRef<MarketDeleteComponent>,
  private service:MarketService) { }

  ngOnInit(): void {
  }

  deleteMarket():void{
    this.service.deleteMarket(this.data.id).subscribe(
      ()=>{
        this.dialogRef.close();
      }
    );
  }
}
