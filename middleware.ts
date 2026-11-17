import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
export const middleware = (r: NextRequest) => updateSession(r);
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)"] };
