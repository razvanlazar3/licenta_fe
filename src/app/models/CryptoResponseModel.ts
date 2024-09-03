export interface CryptoResponseModel {
  id: number,
  name: string,
  symbol: string,
  slug: string,
  score: number,
  grade: number,
  lastUpdated: string,
  price: number,
  volume_24h: number,
  volume_change_24h: number,
  percent_change_1h: number,
  percent_change_24h: number,
  percent_change_7d: number
}
