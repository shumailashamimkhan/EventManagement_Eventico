import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets, so the session cookie
     * stays fresh across normal navigation without doing extra work on
     * every image/font/etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
