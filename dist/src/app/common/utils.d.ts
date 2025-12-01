import { Response } from "express";
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, statusCode?: number) => void;
export declare const sendError: (res: Response, error: string, statusCode?: number) => void;
export declare const calculatePagination: (page: number, limit: number, total: number) => {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};
//# sourceMappingURL=utils.d.ts.map