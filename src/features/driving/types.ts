export type DriverRank = 'starter' | 'experienced' | 'expert' | 'legend';
export type DriverStatus = 'active' | 'pending' | 'suspended' | 'banned';
export type RideStatus = 'started' | 'completed' | 'failed' | 'cancelled';
export type LocationType = 'current' | 'permanent' | 'office' | 'home';

export interface Driver {
    id: string;
    user_id: string;
    car_name: string;
    car_model: string;
    plate_number: string;
    successful_rides: number;
    total_rides: number;
    failed_rides: number;
    rank: DriverRank;
    status: DriverStatus;
}

export interface DriverCreate {
    car_name: string;
    car_model: string;
    plate_number: string;
}

export interface DriverUpdate {
    car_name?: string;
    car_model?: string;
    plate_number?: string;
}

export interface Ride {
    id: string;
    driver_id: string;
    start_location: string;
    destination: string;
    status: RideStatus;
    start_time: string;
    end_time?: string;
    earnings: number;
}

export interface RideCreate {
    start_location: string;
    destination: string;
}

export interface RideComplete {
    success: boolean;
    earnings?: number;
}

export interface LocationUpdate {
    location_type: LocationType;
    lat: number;
    lon: number;
    accuracy_meter: number;
}

export interface DriverNearbyResponse {
    driver_id: string;
    latitude: number;
    longitude: number;
    distance_km: number;
    car_name: string;
}
