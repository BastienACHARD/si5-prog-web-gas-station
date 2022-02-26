export interface Filter {
    latitude: number,
    longitude: number,
    raduisInMeter: number,
    fuels: string[],
    services: string[],
    sortByPrice: boolean
}