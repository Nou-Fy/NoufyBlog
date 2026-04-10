import { NextResponse } from "next/server";
import {
  createResponseSchema,
  listResponsesQuerySchema,
} from "@/features/community/responses.validators";
import {
  createResponse,
  listResponses,
} from "@/features/community/responses.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createResponseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const newResponse = await createResponse(parsed.data);
    return NextResponse.json(newResponse, { status: 201 });
  } catch (error) {
    console.error("Erreur API Responses:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = listResponsesQuerySchema.safeParse({
      discussionId: searchParams.get("discussionId"),
    });
    if (!parsed.success) {
      return NextResponse.json({ error: "Missing discussionId" }, { status: 400 });
    }

    const responses = await listResponses(parsed.data.discussionId);
    return NextResponse.json(responses);
  } catch (error: any) {
    // 🔥 C'EST ICI QUE TU VERRAS L'ERREUR DANS TON TERMINAL
    console.error("[API_RESPONSES_GET]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
