import { api } from '@/lib/api/client';
import {
    Driver,
    DriverCreate,
    DriverUpdate,
    Ride,
    RideCreate,
    RideComplete,
    LocationUpdate,
    DriverNearbyResponse
} from './types';

export class DrivingService {
    static async getDriverProfile(): Promise<Driver> {
        return api.get<Driver>('/driving/drivers/');
    }

    static async createDriverProfile(data: DriverCreate): Promise<Driver> {
        return api.post<Driver>('/driving/drivers/', data);
    }

    static async updateMyDriverProfile(data: DriverUpdate): Promise<Driver> {
        return api.patch<Driver>('/driving/drivers/', data);
    }

    static async getMyDriverProfile(): Promise<Driver> {
        return api.get<Driver>('/driving/drivers/me');
    }

    static async startRide(data: RideCreate): Promise<Ride> {
        return api.post<Ride>('/driving/drivers/start', data);
    }

    static async completeRide(rideId: string, data: RideComplete): Promise<Ride> {
        return api.post<Ride>(`/driving/drivers/${rideId}/complete`, data);
    }

    static async pingLocation(data: LocationUpdate): Promise<void> {
        return api.post<void>('/driving/drivers/ping', data);
    }

    static async getDriversNearby(lat: number, lon: number, radius: number = 5.0): Promise<DriverNearbyResponse[]> {
        console.log(`DrivingService: getDriversNearby called with lat=${lat}, lon=${lon}, radius=${radius}`);
        return api.get<DriverNearbyResponse[]>(`/driving/drivers/nearby?latitude=${lat}&longitude=${lon}&radius=${radius}`);
    }
}
