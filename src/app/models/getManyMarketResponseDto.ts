import { Market } from "./market";

export interface GetManyMarketDto{
    data: Market[],
    count: number,
    total: number,
    page: number,
    pageCount: number
}