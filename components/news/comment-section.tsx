"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, MoreHorizontal, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommentSectionProps {
	articleId: number;
}

const sampleComments = [
	{
		id: 1,
		author: {
			name: "សុខា វី",
			name_en: "Sokha Vee",
			avatar:
				"https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=150",
		},
		content: "កម្មវិធីល្អណាស់! សូមអរគុណក្រុម Mettyerng ដែលបានជួយប្រជាជន។",
		content_en:
			"Great program! Thank you Mettyerng team for helping the community.",
		likes: 12,
		replies: 3,
		timestamp: "2024-01-15T14:30:00Z",
		isVerified: false,
	},
	{
		id: 2,
		author: {
			name: "ដារ៉ា ខេម",
			name_en: "Dara Khem",
			avatar:
				"https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=150",
		},
		content: "យើងត្រូវការកម្មវិធីបែបនេះច្រើនទៀត។ សង្ឃឹមថាអាចបន្តទៀតបាន។",
		content_en: "We need more programs like this. Hope this can continue.",
		likes: 8,
		replies: 1,
		timestamp: "2024-01-15T16:45:00Z",
		isVerified: true,
	},
	{
		id: 3,
		author: {
			name: "ពិសាច្ច នាង",
			name_en: "Pisach Neang",
			avatar:
				"https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=150",
		},
		content: "ខ្ញុំបានចូលរួមក្នុងកម្មវិធីនេះ។ ពិតជាមានអារម្មណ៍ល្អណាស់។",
		content_en:
			"I participated in this program. It was really a great experience.",
		likes: 15,
		replies: 2,
		timestamp: "2024-01-15T18:20:00Z",
		isVerified: false,
	},
];

export function CommentSection({ articleId }: CommentSectionProps) {
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState(sampleComments);

	const handleSubmitComment = (e: React.FormEvent) => {
		e.preventDefault();
		if (newComment.trim()) {
			const comment = {
				id: Date.now(),
				author: {
					name: "អ្នកប្រើប្រាស់",
					name_en: "User",
					avatar:
						"https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=150",
				},
				content: newComment,
				content_en: newComment,
				likes: 0,
				replies: 0,
				timestamp: new Date().toISOString(),
				isVerified: false,
			};
			setComments([comment, ...comments]);
			setNewComment("");
		}
	};

	const formatTimeAgo = (timestamp: string) => {
		const now = new Date();
		const past = new Date(timestamp);
		const diffInHours = Math.floor(
			(now.getTime() - past.getTime()) / (1000 * 60 * 60)
		);

		if (diffInHours < 1) return "ម្តងៗនេះ";
		if (diffInHours < 24) return `${diffInHours} ម៉ោងមុន`;
		const diffInDays = Math.floor(diffInHours / 24);
		return `${diffInDays} ថ្ងៃមុន`;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">មតិយោបល់ ({comments.length})</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Comment Form */}
				<form onSubmit={handleSubmitComment} className="space-y-4">
					<Textarea
						placeholder="សរសេរមតិយោបល់របស់អ្នក..."
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						className="min-h-[100px] resize-none"
					/>
					<div className="flex justify-between items-center">
						<p className="text-sm text-gray-500">សូមរក្សាមតិយោបល់ឱ្យបានសុភាព</p>
						<Button
							type="submit"
							disabled={!newComment.trim()}
							className="bg-khmer-gold hover:bg-khmer-gold-dark text-white"
						>
							បញ្ជូនមតិយោបល់
						</Button>
					</div>
				</form>

				{/* Comments List */}
				<div className="space-y-6">
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
												✓ បានបញ្ជាក់
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

								<div className="flex items-center space-x-4 mt-2">
									<button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-500 transition-colors">
										<Heart className="w-4 h-4" />
										<span>{comment.likes}</span>
									</button>

									<button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-500 transition-colors">
										<MessageCircle className="w-4 h-4" />
										<span>ឆ្លើយតប</span>
									</button>

									<button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
										<MoreHorizontal className="w-4 h-4" />
									</button>
								</div>

								{comment.replies > 0 && (
									<button className="text-xs text-khmer-gold hover:text-khmer-gold-dark mt-2 font-medium">
										មើលការឆ្លើយតប {comment.replies} ទៀត
									</button>
								)}
							</div>
						</div>
					))}
				</div>

				{comments.length > 5 && (
					<div className="text-center pt-4 border-t border-gray-200">
						<Button
							variant="outline"
							className="text-khmer-gold border-khmer-gold hover:bg-khmer-gold hover:text-white"
						>
							មើលមតិយោបល់បន្ថែម
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
