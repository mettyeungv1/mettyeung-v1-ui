"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Eye, Clock, Calendar, X } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { videosData } from "@/lib/data/video";

const categories = [
	{ id: "all", name: "ទាំងអស់", name_en: "All" },
	{ id: "community", name: "សហគមន៍", name_en: "Community" },
	{ id: "education", name: "ការអប់រំ", name_en: "Education" },
	{ id: "culture", name: "វប្បធម៌", name_en: "Culture" },
	{ id: "sports", name: "កីឡា", name_en: "Sports" },
];

export default function VideosPage() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedVideo, setSelectedVideo] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { t } = useTranslation();

	const filteredVideos =
		selectedCategory === "all"
			? videosData
			: videosData.filter((video) => video.category === selectedCategory);

	const featuredVideos = videosData.filter((video) => video.featured);

	const handleVideoClick = (video: any) => {
		setSelectedVideo(video);
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative py-24 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
				<div className="container">
					<AnimatedSection className="text-center max-w-4xl mx-auto">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
							{t("nav.videos")}
						</h1>
						<p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
							ស្វែងយល់ពីសកម្មភាព និងកម្មវិធីរបស់យើងតាមរយៈវីដេអូ
						</p>
					</AnimatedSection>
				</div>
			</section>

			{/* Featured Videos */}
			{featuredVideos.length > 0 && (
				<section className="section-padding bg-white">
					<div className="container">
						<AnimatedSection className="mb-12">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
								វីដេអូសំខាន់
								<span className="block text-xl md:text-2xl gradient-text mt-2">
									Featured Videos
								</span>
							</h2>
						</AnimatedSection>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{featuredVideos.map((video, index) => (
								<AnimatedSection key={video.id} delay={index * 0.2}>
									<Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer">
										<div
											className="relative aspect-video overflow-hidden"
											onClick={() => handleVideoClick(video)}
										>
											<img
												src={video.thumbnail}
												alt={video.title}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
											/>
											<div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

											{/* Play Button */}
											<motion.div
												className="absolute inset-0 flex items-center justify-center"
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
											>
												<div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
													<Play className="w-6 h-6 text-khmer-gold ml-1" />
												</div>
											</motion.div>

											{/* Duration */}
											<div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
												{video.duration}
											</div>
										</div>

										<CardContent className="p-6">
											<div className="flex items-center space-x-4 mb-4">
												<Badge className="bg-khmer-gold text-white">
													{
														categories.find((c) => c.id === video.category)
															?.name_en
													}
												</Badge>
												<div className="flex items-center text-sm text-gray-500">
													<Calendar className="w-4 h-4 mr-1" />
													{formatDate(video.date)}
												</div>
											</div>

											<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-khmer-gold transition-colors line-clamp-1">
												{video.title_en}
											</h3>

											<p className="text-gray-600 leading-relaxed mb-4 line-clamp-1">
												{video.description}
											</p>

											<div className="flex items-center space-x-4 text-sm text-gray-500">
												{/* <div className="flex items-center">
													<Eye className="w-4 h-4 mr-1" />
													{video.views.toLocaleString()} views
												</div> */}
												<div className="flex items-center">
													<Clock className="w-4 h-4 mr-1" />
													{video.duration}
												</div>
											</div>
										</CardContent>
									</Card>
								</AnimatedSection>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Video Gallery */}
			<section className="section-padding bg-gray-50">
				<div className="container">
					<AnimatedSection className="mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
							វីដេអូទាំងអស់
							<span className="block text-xl md:text-2xl gradient-text mt-2">
								Video Gallery
							</span>
						</h2>
					</AnimatedSection>

					<Tabs
						value={selectedCategory}
						onValueChange={setSelectedCategory}
						className="w-full"
					>
						<TabsList className="grid w-full grid-cols-5 mb-8">
							{categories.map((category) => (
								<TabsTrigger
									key={category.id}
									value={category.id}
									className="text-sm"
								>
									{category.name_en}
								</TabsTrigger>
							))}
						</TabsList>

						<TabsContent value={selectedCategory}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{filteredVideos.map((video, index) => (
									<AnimatedSection key={video.id} delay={index * 0.1}>
										<Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
											<div
												className="relative aspect-video overflow-hidden"
												onClick={() => handleVideoClick(video)}
											>
												<img
													src={video.thumbnail}
													alt={video.title}
													className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
												/>
												<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

												{/* Play Button */}
												<motion.div
													className="absolute inset-0 flex items-center justify-center"
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
												>
													<div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md">
														<Play className="w-5 h-5 text-khmer-gold ml-0.5" />
													</div>
												</motion.div>

												{/* Duration */}
												<div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
													{video.duration}
												</div>
											</div>

											<CardContent className="p-4">
												<div className="flex items-center space-x-2 mb-2">
													<Badge variant="secondary" className="text-xs">
														{
															categories.find((c) => c.id === video.category)
																?.name_en
														}
													</Badge>
												</div>

												<h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-khmer-gold transition-colors line-clamp-1">
													{video.title_en}
												</h3>

												<p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-1">
													{video.description}
												</p>

												<div className="flex items-center justify-between text-xs text-gray-500">
													{/* <div className="flex items-center">
														<Eye className="w-3 h-3 mr-1" />
														{video.views.toLocaleString()}
													</div> */}
													<div className="flex items-center">
														<Calendar className="w-3 h-3 mr-1" />
														{formatDate(video.date)}
													</div>
												</div>
											</CardContent>
										</Card>
									</AnimatedSection>
								))}
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</section>

			{/* Video Modal */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-4xl w-full">
					<DialogHeader>
						<DialogTitle className="text-lg font-bold">
							{selectedVideo?.title_en}
						</DialogTitle>
					</DialogHeader>

					{selectedVideo && (
						<div className="space-y-4">
							<div className="aspect-video bg-black rounded-lg overflow-hidden">
								<iframe
									width="100%"
									height="100%"
									src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
									title={selectedVideo.title}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</div>

							<div className="space-y-2">
								<div className="flex items-center space-x-4">
									<Badge className="bg-khmer-gold text-white">
										{
											categories.find((c) => c.id === selectedVideo.category)
												?.name_en
										}
									</Badge>
									<div className="flex items-center text-sm text-gray-500">
										<Calendar className="w-4 h-4 mr-1" />
										{formatDate(selectedVideo.date)}
									</div>
									<div className="flex items-center text-sm text-gray-500">
										{/* <Eye className="w-4 h-4 mr-1" /> */}
										{/* {selectedVideo.views.toLocaleString()} views */}
									</div>
								</div>

								<p className="text-gray-600 leading-relaxed">
									{selectedVideo.description}
								</p>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
