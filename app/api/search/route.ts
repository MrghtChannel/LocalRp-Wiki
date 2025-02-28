import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "No search query provided" }, { status: 400 });
    }

    const pagesDir = path.join(process.cwd(), "app");
    const results = searchPages(pagesDir, query.toLowerCase());

    return NextResponse.json({ results });
  }
  catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}  

function searchPages(dir: string, query: string, foundPages: string[] = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      searchPages(filePath, query, foundPages);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts") || file.endsWith(".mdx")) {
      const content = fs.readFileSync(filePath, "utf-8");
      if (content.toLowerCase().includes(query)) {
        foundPages.push(filePath.replace(process.cwd(), ""));
      }
    }
  }

  return foundPages;
}