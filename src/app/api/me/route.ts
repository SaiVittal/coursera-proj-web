import { getSessionUser } from "@/lib/session";
import { api } from "@/lib/api-handler";
import { canAccessRoute } from "@/lib/role-helper";

export async function GET() {
    const user = await getSessionUser();

    if (!user) {
        return api.unauthorized();
    }

    if (!canAccessRoute(user.role, "profile")) {
        return api.forbidden("You do not have access to this resource");
    }

    return api.ok({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    });
}
