import { NextResponse } from "next/server";

export type ApiSuccess<T = unknown> = { data: T };
export type ApiError = { error: string; details?: string };

/**
 * Consistent API response helpers.
 */
export const api = {
    ok<T>(data: T, status = 200) {
        return NextResponse.json({ data } as ApiSuccess<T>, { status });
    },

    badRequest(message: string, details?: string) {
        return NextResponse.json(
            { error: message, ...(details && { details }) } as ApiError,
            { status: 400 }
        );
    },

    unauthorized(message = "Unauthorized") {
        return NextResponse.json({ error: message } as ApiError, { status: 401 });
    },

    forbidden(message = "Forbidden") {
        return NextResponse.json({ error: message } as ApiError, { status: 403 });
    },

    notFound(message = "Not found") {
        return NextResponse.json({ error: message } as ApiError, { status: 404 });
    },

    serverError(message = "Internal server error", details?: string) {
        return NextResponse.json(
            { error: message, ...(process.env.NODE_ENV === "development" && details && { details }) } as ApiError,
            { status: 500 }
        );
    },
};
