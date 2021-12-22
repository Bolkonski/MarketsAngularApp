export interface Market {
    symbol: string,
    name: string,
    country: string,
    industry: string,
    ipoYear: number,
    marketCap: number,
    sector: string,
    volume: number,
    netChange: number,
    netChangePercent: number,
    createdAt: string, //datetime
    updatedAt: string, //datetime
    id: number
}