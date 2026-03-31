import { loginUserService } from "@/lib/services/auth.service";
import { loginSchema } from "@/lib/validator/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify(parsed.error.flatten()), {
        status: 400,
      });
    }

    const user = await loginUserService(parsed.data);

    return Response.json({
      message: "Connexion réussie",
      user,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
