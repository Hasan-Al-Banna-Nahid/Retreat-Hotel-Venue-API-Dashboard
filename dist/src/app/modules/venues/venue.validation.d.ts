import { z } from "zod";
export declare const createVenueSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    capacity: z.ZodNumber;
    pricePerNight: z.ZodNumber;
    images: z.ZodArray<z.ZodString, "many">;
    amenities: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    city: string;
    capacity: number;
    pricePerNight: number;
    images: string[];
    amenities: string[];
    description?: string | undefined;
}, {
    name: string;
    city: string;
    capacity: number;
    pricePerNight: number;
    images: string[];
    description?: string | undefined;
    amenities?: string[] | undefined;
}>;
export declare const updateVenueSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodString>;
    capacity: z.ZodOptional<z.ZodNumber>;
    pricePerNight: z.ZodOptional<z.ZodNumber>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    amenities: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    city?: string | undefined;
    capacity?: number | undefined;
    pricePerNight?: number | undefined;
    images?: string[] | undefined;
    amenities?: string[] | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    city?: string | undefined;
    capacity?: number | undefined;
    pricePerNight?: number | undefined;
    images?: string[] | undefined;
    amenities?: string[] | undefined;
}>;
export declare const venueFilterSchema: z.ZodObject<{
    city: z.ZodCatch<z.ZodOptional<z.ZodString>>;
    minCapacity: z.ZodEffects<z.ZodCatch<z.ZodOptional<z.ZodString>>, number | undefined, unknown>;
    maxPrice: z.ZodEffects<z.ZodCatch<z.ZodOptional<z.ZodString>>, number | undefined, unknown>;
    page: z.ZodEffects<z.ZodDefault<z.ZodString>, number, string | undefined>;
    limit: z.ZodEffects<z.ZodDefault<z.ZodString>, number, string | undefined>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    city?: string | undefined;
    minCapacity?: number | undefined;
    maxPrice?: number | undefined;
}, {
    city?: unknown;
    minCapacity?: unknown;
    maxPrice?: unknown;
    page?: string | undefined;
    limit?: string | undefined;
}>;
//# sourceMappingURL=venue.validation.d.ts.map