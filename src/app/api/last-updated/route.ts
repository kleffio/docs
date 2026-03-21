import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const docPath = request.nextUrl.searchParams.get("path");
  if (!docPath) return new NextResponse("Missing path", { status: 400 });

  const segments = docPath.replace(/^\/docs/, "").split("/").filter(Boolean);
  const filePath = path.join(process.cwd(), "src", "app", "docs", ...segments, "page.mdx");

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { mtime } = fs.statSync(filePath);
  return NextResponse.json({ mtime: mtime.toISOString() });
}
