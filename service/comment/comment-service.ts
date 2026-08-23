import { BLOG_ENDPOINT } from "@/lib/static";
import { fetchAPI } from "@/lib/api";

export interface CommentAuthor {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface CommentItem {
  id: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
  author: CommentAuthor;
}

export async function listCommentsService(blogId: string) {
  return fetchAPI<CommentItem[]>(`${BLOG_ENDPOINT}/${blogId}/comments`, {
    skipAuth: true,
    next: { revalidate: 60, tags: ["comments", `blog:${blogId}:comments`] },
  });
}

export async function createCommentService(blogId: string, payload: { content: string }) {
  return fetchAPI<CommentItem>(`${BLOG_ENDPOINT}/${blogId}/comments`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

