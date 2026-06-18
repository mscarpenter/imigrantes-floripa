import { NextResponse } from "next/server";
import {
  submitWelcomeToGoogleForm,
  type WelcomeSubmitInput,
} from "@/lib/welcome-submit";

export async function POST(request: Request) {
  let payload: WelcomeSubmitInput;
  try {
    payload = (await request.json()) as WelcomeSubmitInput;
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  const result = await submitWelcomeToGoogleForm(payload);
  if (!result.ok) {
    return NextResponse.json(result, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
