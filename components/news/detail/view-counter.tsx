"use client";

import { useEffect } from "react";
import { incrementBlogView } from "@/service/blog/blog-service";

export function ViewCounter({ postId }: { postId: string }) {
	useEffect(() => {
		incrementBlogView(postId).catch(() => undefined);
	}, [postId]);

	return null;
}
