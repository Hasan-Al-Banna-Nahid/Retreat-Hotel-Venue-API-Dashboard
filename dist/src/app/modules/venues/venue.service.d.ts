import { Venue, VenueFilterParams, CreateVenueInput, UpdateVenueInput, VenuePreview } from "./venue.interface";
export declare class VenueService {
    findAll(filters: VenueFilterParams): Promise<{
        venues: VenuePreview[];
        total: number;
    }>;
    findById(id: string): Promise<Venue | null>;
    create(data: CreateVenueInput): Promise<Venue>;
    update(id: string, data: UpdateVenueInput): Promise<Venue>;
    delete(id: string): Promise<void>;
    validateCapacity(venueId: string, attendeeCount: number): Promise<boolean>;
}
//# sourceMappingURL=venue.service.d.ts.map