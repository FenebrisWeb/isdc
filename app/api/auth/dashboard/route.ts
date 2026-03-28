import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (
    !process.env.DASHBOARD_PASSWORD ||
    password !== process.env.DASHBOARD_PASSWORD
  ) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = process.env.DASHBOARD_TOKEN;
  if (!token) {
    return Response.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const cookieStore = await cookies();
  cookieStore.set("dash_auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("dash_auth");
  return Response.json({ ok: true });
}
