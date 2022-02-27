export interface Filter {
    latitude: number,
    longitude: number,
    radiusInMeter: number,
    fuels: string[],
    services: string[],
    sortByPrice: boolean
}