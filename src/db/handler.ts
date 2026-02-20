import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export type UserCreate = {
    email: string;
    name?: string | null;
    role?: Role;
};

export type UserUpdate = {
    name?: string | null;
    role?: Role;
};

/**
 * Central DB handler for User and future entities.
 * Use this instead of calling prisma directly for consistent error handling.
 */
export const db = {
    user: {
        async findById(id: string) {
            return prisma.user.findUnique({ where: { id } });
        },
        async findByEmail(email: string) {
            return prisma.user.findUnique({ where: { email } });
        },
        async create(data: UserCreate) {
            return prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name ?? null,
                    role: data.role ?? "USER",
                },
            });
        },
        async updateByEmail(email: string, data: UserUpdate) {
            return prisma.user.update({
                where: { email },
                data,
            });
        },
        async updateRole(email: string, role: Role) {
            return prisma.user.update({
                where: { email },
                data: { role },
            });
        },
        async upsert(data: UserCreate) {
            return prisma.user.upsert({
                where: { email: data.email },
                update: { name: data.name ?? undefined },
                create: {
                    email: data.email,
                    name: data.name ?? null,
                    role: data.role ?? "USER",
                },
            });
        },
    },
};
