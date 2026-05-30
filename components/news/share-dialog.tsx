"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as CloseIcon, Facebook, Linkedin, Send, MessageCircle, Link, Mail } from "lucide-react";
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
		{ id: "facebook", name: "Facebook", icon: Facebook },
		{ id: "linkedin", name: "LinkedIn", icon: Linkedin },
		{ id: "whatsapp", name: "WhatsApp", icon: MessageCircle },
		{ id: "telegram", name: "Telegram", icon: Send },
		{ id: "email", name: "Email", icon: Mail },
	];

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/40 backdrop-blur-sm"
						onClick={onClose}
					/>

					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className="relative z-10 w-full max-w-md mx-4"
					>
						<Card className="border-0 shadow-2xl overflow-hidden rounded-2xl">
							<CardHeader className="pb-2 border-b border-gray-100 bg-gray-50/50">
								<div className="flex items-center justify-between">
									<CardTitle className="text-lg font-semibold text-gray-900">Share Article</CardTitle>
									<Button
										variant="ghost"
										size="icon"
										onClick={onClose}
										className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 rounded-full"
									>
										<CloseIcon className="w-4 h-4" />
									</Button>
								</div>
							</CardHeader>

							<CardContent className="pt-6 pb-6 space-y-6">
								{/* Article Preview */}
								<div className="flex space-x-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
									<div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
										<img
											src={article.image}
											alt={article.title_en}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex-1 min-w-0 flex flex-col justify-center">
										<h4 className="font-medium text-gray-900 text-sm line-clamp-2 leading-snug mb-1">
											{article.title_en}
										</h4>
										<p className="text-xs text-gray-500 line-clamp-1">
											{article.excerpt}
										</p>
									</div>
								</div>

								<div className="grid grid-cols-5 gap-2">
									{shareOptions.map((option) => (
										<button
											key={option.id}
											onClick={() => {
												onShare(option.id);
												onClose();
											}}
											className="flex flex-col items-center justify-center gap-2 group p-2"
										>
											<div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-200 group-hover:scale-110 shadow-sm">
												<option.icon className="w-5 h-5" />
											</div>
											<span className="text-xs text-gray-600 font-medium group-hover:text-primary transition-colors">{option.name}</span>
										</button>
									))}
								</div>

								{/* Copy Link */}
								<div className="pt-4 border-t border-gray-100">
									<div className="flex items-center space-x-2">
										<div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 truncate select-all">
											{typeof window !== 'undefined' ? window.location.href : 'Loading...'}
										</div>
										<Button 
											onClick={() => {
												onShare("copy");
												onClose();
											}}
											className="bg-primary hover:bg-primary/90 text-white shrink-0"
										>
											<Link className="w-4 h-4 mr-2" />
											Copy
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
