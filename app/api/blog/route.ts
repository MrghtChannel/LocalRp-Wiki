import { NextResponse } from "next/server";
import { getAllBlogsFrontmatter } from "@/lib/markdown";

export async function GET() {
  try {
    const posts = await getAllBlogsFrontmatter();

    const enrichedPosts = posts.map(post => ({
      ...post,
      url: `/blog/${post.slug}`,
    }));

    return NextResponse.json({ posts: enrichedPosts });
  } catch (err) {
    console.error("Error in /api/blog:", err);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}
