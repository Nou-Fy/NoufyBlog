import { createUserService } from "@/lib/services/user.services";
import { userSchema } from "@/lib/validator/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = userSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify(parsed.error.flatten()), {
        status: 400,
      });
    }

    const user = await createUserService(parsed.data);

    return Response.json(user);
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
