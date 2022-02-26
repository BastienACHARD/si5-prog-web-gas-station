export interface Filter {
    latitude: number,
    longitude: number,
    raduisInMeter: number,
    fuels: string[],
    services: string[],
    prices: number[],
    sortByPrice: boolean
}