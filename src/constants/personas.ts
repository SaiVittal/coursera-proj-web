import { Role } from "@prisma/client";

/**
 * Persona (role) constants - single source of truth.
 * Configure allowed roles and their metadata here.
 */
export const PERSONAS = {
    USER: "USER",
    TESTER: "TESTER",
    ADMIN: "ADMIN",
} as const;

export type PersonaKey = keyof typeof PERSONAS;

/** Map persona keys to Prisma Role enum */
export const PERSONA_TO_ROLE: Record<PersonaKey, Role> = {
    USER: "USER" as Role,
    TESTER: "TESTER" as Role,
    ADMIN: "ADMIN" as Role,
};

/** All roles as array for iteration and validation */
export const ALL_PERSONAS: Role[] = Object.values(PERSONA_TO_ROLE);

/** Display labels for each persona (configurable) */
export const PERSONA_LABELS: Record<Role, string> = {
    USER: "User",
    TESTER: "Tester",
    ADMIN: "Admin",
};

/** Optional: hierarchy for access control (higher index = more privileged) */
export const PERSONA_HIERARCHY: Role[] = ["USER", "TESTER", "ADMIN"];

/** Config: which roles can access which routes (extend as needed) */
export const PERSONA_ACCESS: Record<string, Role[]> = {
    dashboard: [...ALL_PERSONAS],
    profile: [...ALL_PERSONAS],
    admin: ["ADMIN"],
};
