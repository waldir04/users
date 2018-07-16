export interface Address {
    city: string;
    geo: Geo;
    street: string;
    suite: string;
    zipcode: string;
}

export interface Geo {
    lat: number | string;
    lng: number | string;
}
