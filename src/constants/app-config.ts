/**
 * App-wide configuration constants.
 */
export const APP_CONFIG = {
    NAME: "Coursera Analysis Dashboard",
    VERSION: "1.0.0",
    DEFAULT_LOAD_DELAY: 800, // ms for simulated loaders
    PAGINATION: {
        DEFAULT_LIMIT: 10,
    },
    MESSAGES: {
        API_ERROR: "An unexpected error occurred. Please try again later.",
        AUTH_REQUIRED: "Please log in to access this page.",
        PERMISSION_DENIED: "You do not have permission to perform this action.",
    },
    DURATIONS: {
        TOAST: 4000,
    }
} as const;
