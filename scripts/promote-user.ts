import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function promoteUser(email: string) {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role: "ADMIN" },
        });
        console.log(`Successfully promoted ${user.email} to ADMIN role.`);
    } catch (error) {
        console.error(`Failed to promote user ${email}:`, error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

const targetEmail = process.argv[2];
if (!targetEmail) {
    console.error("Please provide an email address as an argument.");
    process.exit(1);
}

promoteUser(targetEmail);
