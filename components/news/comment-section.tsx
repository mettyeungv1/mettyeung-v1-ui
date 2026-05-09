"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	createCommentService,
	listCommentsService,
} from "@/service/comment/comment-service";
import { useSession } from "next-auth/react";
import { LoginPromptModal } from "../comments/login-prompt-modal";
import { useTranslation } from "@/lib/i18n";

interface CommentSectionProps {
	articleId: number;
}

type UIComment = {
	id: string | number;
	author: { name_en: string; avatar: string };
	content_en: string;
	timestamp: string;
	isVerified: boolean;
};

export function CommentSection({ articleId }: CommentSectionProps) {
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState<UIComment[]>([]);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const { data: session } = useSession();
	const { t } = useTranslation();

	useEffect(() => {
		(async () => {
			const res = await listCommentsService(String(articleId));
			if (res.status_code === 200 && Array.isArray(res.data)) {
				const mapped: UIComment[] = res.data.map((c) => ({
					id: c.id,
					author: {
						name_en: c.author?.name || "User",
						avatar: c.author?.avatarUrl || "",
					},
					content_en: c.content,
					timestamp: (c as any).createdAt as string,
					isVerified: !!(c as any).isApproved,
				}));
				setComments(mapped);
			}
		})();
	}, [articleId]);

	const handleFocus = () => {
		if (!session) {
			setShowLoginModal(true);
		}
	};

	const handleSubmitComment = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newComment.trim()) return;
		const optimistic: UIComment = {
			id: `tmp-${Date.now()}`,
			author: { name_en: "You", avatar: "" },
			content_en: newComment,
			timestamp: new Date().toISOString(),
			isVerified: false,
		};
		setComments([optimistic, ...comments]);
		setNewComment("");
		const res = await createCommentService(String(articleId), {
			content: optimistic.content_en,
		});
		if (res.status_code === 201 && res.data) {
			const saved: UIComment = {
				id: res.data.id,
				author: {
					name_en: res.data.author?.name || "You",
					avatar: res.data.author?.avatarUrl || "",
				},
				content_en: res.data.content,
				timestamp: (res.data as any).createdAt as string,
				isVerified: !!res.data.isApproved,
			};
			setComments((prev) => [
				saved,
				...prev.filter((c) => String(c.id) !== String(optimistic.id)),
			]);
		}
	};

	const formatTimeAgo = (timestamp: string) => {
		const now = new Date();
		const past = new Date(timestamp);
		const diffInHours = Math.floor(
			(now.getTime() - past.getTime()) / (1000 * 60 * 60)
		);

		if (diffInHours < 1) return t("comments.justNow") || "Just now";
		if (diffInHours < 24) return `${diffInHours}h ago`;
		const diffInDays = Math.floor(diffInHours / 24);
		return `${diffInDays}d ago`;
	};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">
						{t("comments.title") || "Comments"} ({comments.length})
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Comment Form */}
					<form onSubmit={handleSubmitComment} className="space-y-4">
						<Textarea
							placeholder={t("comments.placeholder") || "Write a comment..."}
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							onFocus={handleFocus}
							className="min-h-[100px] resize-none"
						/>
						<div className="flex justify-between items-center">
							<p className="text-sm text-gray-500">
								{t("comments.keepRespectful") || "Please keep comments respectful."}
							</p>
							<Button
								type="submit"
								disabled={!newComment.trim()}
								className="bg-khmer-gold hover:bg-khmer-gold-dark text-white"
							>
								{t("comments.submit") || "Post Comment"}
							</Button>
						</div>
					</form>

					{/* Comments List */}
					<div className="space-y-6">
						{comments.length === 0 && (
							<p className="text-center text-sm text-gray-400 py-6">
								{t("comments.empty") || "No comments yet. Be the first to comment!"}
							</p>
						)}
						{comments.map((comment) => (
							<div key={comment.id} className="flex space-x-3">
								<Avatar className="w-10 h-10">
									<AvatarImage
										src={comment.author.avatar}
										alt={comment.author.name_en}
									/>
									<AvatarFallback>
										{comment.author.name_en.charAt(0)}
									</AvatarFallback>
								</Avatar>

								<div className="flex-1 min-w-0">
									<div className="bg-gray-50 rounded-lg p-4">
										<div className="flex items-center space-x-2 mb-2">
											<h4 className="font-semibold text-gray-900 text-sm">
												{comment.author.name_en}
											</h4>
											{comment.isVerified && (
												<Badge variant="secondary" className="text-xs">
													Verified
												</Badge>
											)}
											<span className="text-xs text-gray-500">
												{formatTimeAgo(comment.timestamp)}
											</span>
										</div>
										<p className="text-gray-700 text-sm leading-relaxed">
											{comment.content_en}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
			<LoginPromptModal
				open={showLoginModal}
				onOpenChange={setShowLoginModal}
			/>
		</>
	);
}
