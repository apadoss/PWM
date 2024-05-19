export interface Album {
    id?: string;
    favorited: boolean,
    name: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    cityName: string;
    coordinates: number[];
    userId: string;
}
