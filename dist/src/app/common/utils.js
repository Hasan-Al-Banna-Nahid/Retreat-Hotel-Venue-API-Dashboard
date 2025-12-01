"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
    const response = {
        success: true,
        data,
        message,
    };
    res.status(statusCode).json(response);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, error, statusCode = 400) => {
    const response = {
        success: false,
        error,
    };
    res.status(statusCode).json(response);
};
exports.sendError = sendError;
const calculatePagination = (page, limit, total) => {
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
};
exports.calculatePagination = calculatePagination;
//# sourceMappingURL=utils.js.map