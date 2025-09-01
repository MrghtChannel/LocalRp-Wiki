import { NextResponse } from "next/server";
import { getAllBlogsFrontmatter } from "@/lib/markdown";

export async function GET() {
  try {
    const posts = await getAllBlogsFrontmatter();

    const enrichedPosts = posts.map(post => ({
      ...post,
      url: `/blog/${post.slug}`,
    }));

    return NextResponse.json(
      { posts: enrichedPosts },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", 
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (err) {
    console.error("Error in /api/blog:", err);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { 
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
