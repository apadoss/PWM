export interface Album {
    id?: string;
    name: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    coordinate: GeolocationCoordinates;
    userId: string;
}
