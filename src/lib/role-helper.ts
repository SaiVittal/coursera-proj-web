import { Role } from "@prisma/client";
import { ALL_PERSONAS, PERSONA_ACCESS } from "@/constants/personas";

export function hasAccess(userRole: Role, required: Role[]): boolean {
    return required.includes(userRole);
}

export function requirePersona(userRole: Role | null | undefined, allowedRoles: readonly Role[]): boolean {
    if (!userRole) return false;
    return (allowedRoles as Role[]).includes(userRole);
}

export function canAccessRoute(userRole: Role | null | undefined, route: string): boolean {
    const allowed = PERSONA_ACCESS[route];
    if (!allowed) return false;
    return requirePersona(userRole, allowed);
}

export function isAdmin(userRole: Role | null | undefined): boolean {
    return userRole === "ADMIN";
}

export function isValidPersona(role: string): role is Role {
    return ALL_PERSONAS.includes(role as Role);
}
