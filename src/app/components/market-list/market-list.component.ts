import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { QueryFilter, RequestQueryBuilder } from '@nestjsx/crud-request';
import { Market } from 'src/app/models/market';
import { MarketService } from 'src/app/services/market.service';
import { MarketCreateComponent } from '../market-create/market-create.component';
import { MarketDeleteComponent } from '../market-delete/market-delete.component';
import { MarketDetailsComponent } from '../market-details/market-details.component';
import { MarketEditComponent } from '../market-edit/market-edit.component';

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

  total: number;
  pageSize: number = parseInt(localStorage.getItem('market_pageSize') || '5');
  currentPage: number = parseInt(localStorage.getItem('market_currentPage') || '1');
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoading: boolean = false;
  sortField: string = localStorage.getItem('market_sortField') || 'updatedAt';
  sortDirection: string = localStorage.getItem('market_sortDirection') || 'DESC';

  filters: QueryFilter[] = [];
  nameFilter: FormControl = new FormControl([localStorage.getItem('market_nameFilter') || '']);
  industryFilter: FormControl = new FormControl([localStorage.getItem('market_industryFilter') || '']);
  startUpdateFilter: FormControl = new FormControl([localStorage.getItem('market_startUpdateFilter') || '']);
  endUpdateFilter: FormControl = new FormControl([localStorage.getItem('market_endUpdateFilter') || '']);

  constructor(private service: MarketService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchMarkets();
  }

  searchMarkets(): void {
    this.isLoading = true;
    let queryString = RequestQueryBuilder.create({
      fields: this.fields,
      sort: [{
        field: this.sortField,
        order: this.sortDirection.toUpperCase() === 'ASC' ? "ASC" : "DESC"
      }],
      page: this.currentPage,
      limit: this.pageSize
    });
    if(this.nameFilter.value.toString()!==''){
      localStorage.setItem('market_nameFilter',this.nameFilter.value.toString());
      queryString.setFilter({field: "name",operator: "$cont",value: this.nameFilter.value});
    }
    if(this.industryFilter.value.toString()!==''){
      localStorage.setItem('market_industryFilter',this.nameFilter.value);
      queryString.setFilter({field: "industry",operator: "$cont",value: this.industryFilter.value});
    }
    if(this.startUpdateFilter.value.toString()!==''&&this.endUpdateFilter.value.toString()!==''){
      localStorage.setItem('market_startUpdateFilter',this.startUpdateFilter.value);
      localStorage.setItem('market_endUpdateFilter',this.endUpdateFilter.value);
      const isoStart=(new Date(this.startUpdateFilter.value)).toISOString();
      const isoEnd=(new Date(this.endUpdateFilter.value)).toISOString();
      queryString.setFilter({field: "updatedAt",operator: "$between",value: [isoStart,isoEnd]});
    }
    this.service.getMarkets(queryString.query(false)).subscribe(response => {
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
    this.service.getMarketById(market.id).subscribe(
      (response) => {
        this.dialog.open(MarketDetailsComponent,
          {
            data: response,
          });
      });
  }

  createMarket(): void {
    this.dialog.open(MarketCreateComponent)
      .afterClosed().subscribe(() => {
        this.searchMarkets();
      });
  }

  editMarket(market: Market): void {
    this.service.getMarketById(market.id).subscribe(
      (response) => {
        this.dialog.open(MarketEditComponent,
          {
            data: response,
          })
          .afterClosed().subscribe(() => {
            this.searchMarkets();
          });
      });
  }

  deleteMarket(market: Market): void {
    this.dialog.open(MarketDeleteComponent,
      {
        data: market,
      })
      .afterClosed().subscribe(() => {
        this.searchMarkets();
      });
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      return;
    }
    this.sortField = sort.active;
    localStorage.setItem('market_sortField', this.sortField);
    this.sortDirection = sort.direction;
    localStorage.setItem('market_sortDirection', this.sortDirection);
    this.searchMarkets();
  }

  resetFilters():void{
    this.nameFilter.setValue('');
    localStorage.setItem('market_nameFilter', '');
    this.industryFilter.setValue('');
    localStorage.setItem('market_industryFilter', '');
    this.startUpdateFilter.setValue('');
    localStorage.setItem('market_startUpdateFilter', '');
    this.endUpdateFilter.setValue('');
    localStorage.setItem('market_endUpdateFilter', '');
    this.searchMarkets();
  }

  rangeUpdateFilter():void{
    if(this.startUpdateFilter.value.toString()!==''&&this.endUpdateFilter.value.toString()!==''){
      this.searchMarkets();
    }
  }
}
