import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Market } from 'src/app/models/market';

@Component({
  selector: 'app-market-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.css']
})
export class MarketDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Market) { }

  ngOnInit(): void {
  }

}
