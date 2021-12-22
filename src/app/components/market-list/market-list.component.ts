import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { Market } from 'src/app/models/market';
import { MarketService } from 'src/app/services/market.service';
import { MarketCreateComponent } from '../market-create/market-create.component';
import { MarketDetailsComponent } from '../market-details/market-details.component';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {
  fields: string[] = [
    'symbol',
    'name',
    'industry',
    'country'
  ];
  displayedColumns: string[] = [
    ...this.fields,
    'actions',
  ];
  markets: Market[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  total: number = 0;
  pageSize: number = parseInt(localStorage.getItem('market_pageSize') || '5');
  currentPage: number = parseInt(localStorage.getItem('market_currentPage') || '1');;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoading: boolean = false;

  constructor(private service: MarketService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchMarkets();
  }

  searchMarkets(): void {
    this.isLoading = true;
    let queryString = RequestQueryBuilder.create({
      fields: this.fields,
      //sort: [{ field: "id", order: "DESC" }],
      page: this.currentPage,
      limit: this.pageSize,
      //resetCache: true
    })
      .query(false);
    this.service.getMarkets(queryString).subscribe(response => {
      this.markets = response.data;
      this.total = response.total;
      this.paginator.pageIndex = response.page - 1;
      this.isLoading = false;
    });
  }

  pageChanged(event: PageEvent): void {
    console.log({ event });
    this.pageSize = event.pageSize;
    localStorage.setItem('market_pageSize', this.pageSize.toString());
    this.currentPage = event.pageIndex + 1;
    localStorage.setItem('market_currentPage', this.currentPage.toString());
    this.searchMarkets();
  }

  displayMarket(market: Market): void {
    this.dialog.open(MarketDetailsComponent,
      {
        data: market,
      });
  }

  createMarket():void{
    this.dialog.open(MarketCreateComponent);
  }

}
