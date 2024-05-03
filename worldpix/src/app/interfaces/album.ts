export interface Album {
    id?: string;
    name: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    cityName: string;
    coordinates: GeolocationCoordinates;
    userId: string;
}
