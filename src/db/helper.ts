import { db } from "@/db/handler";
import type { Role } from "@prisma/client";

/**
 * @deprecated Use db from "@/db/handler" instead.
 * Kept for backward compatibility.
 */
export const dbHelper = {
    user: {
        create: async (data: { name: string; email: string; role?: Role }) => {
            return db.user.create(data);
        },
        findByEmail: async (email: string) => {
            return db.user.findByEmail(email);
        },
        updateRole: async (email: string, role: Role) => {
            return db.user.updateRole(email, role);
        },
    },
};
