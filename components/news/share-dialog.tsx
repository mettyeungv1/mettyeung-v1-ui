"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Facebook, Twitter, Link, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ShareDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onShare: (platform: string) => void;
	article: {
		title_en: string;
		excerpt: string;
		image: string;
	};
}

export function ShareDialog({
	isOpen,
	onClose,
	onShare,
	article,
}: ShareDialogProps) {
	const shareOptions = [
		{
			id: "facebook",
			name: "Facebook",
			icon: Facebook,
			color: "text-blue-600",
			bgColor: "bg-blue-50",
			hoverColor: "hover:bg-blue-100",
		},
		{
			id: "twitter",
			name: "Twitter",
			icon: Twitter,
			color: "text-sky-600",
			bgColor: "bg-sky-50",
			hoverColor: "hover:bg-sky-100",
		},
		{
			id: "telegram",
			name: "Telegram",
			icon: MessageCircle,
			color: "text-blue-500",
			bgColor: "bg-blue-50",
			hoverColor: "hover:bg-blue-100",
		},
		{
			id: "email",
			name: "Email",
			icon: Mail,
			color: "text-gray-600",
			bgColor: "bg-gray-50",
			hoverColor: "hover:bg-gray-100",
		},
		{
			id: "copy",
			name: "ចម្លងតំណ",
			icon: Link,
			color: "text-gray-600",
			bgColor: "bg-gray-50",
			hoverColor: "hover:bg-gray-100",
		},
	];

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50"
						onClick={onClose}
					/>

					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						className="relative z-10 w-full max-w-md mx-4"
					>
						<Card>
							<CardHeader className="pb-4">
								<div className="flex items-center justify-between">
									<CardTitle className="text-lg">ចែករំលែកព័ត៌មាន</CardTitle>
									<Button
										variant="ghost"
										size="sm"
										onClick={onClose}
										className="text-gray-500 hover:text-gray-700"
									>
										<X className="w-4 h-4" />
									</Button>
								</div>
							</CardHeader>

							<CardContent className="space-y-4">
								{/* Article Preview */}
								<div className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
									<div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
										<img
											src={article.image}
											alt={article.title_en}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
											{article.title_en}
										</h4>
										<p className="text-xs text-gray-600 line-clamp-2">
											{article.excerpt}
										</p>
									</div>
								</div>

								{/* Share Options */}
								<div className="grid grid-cols-2 gap-3">
									{shareOptions.map((option) => (
										<Button
											key={option.id}
											variant="outline"
											className={`h-12 ${option.color} ${option.bgColor} ${option.hoverColor} border-transparent justify-start`}
											onClick={() => {
												onShare(option.id);
												onClose();
											}}
										>
											<option.icon className="w-4 h-4 mr-2" />
											{option.name}
										</Button>
									))}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
