"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Calendar, Tag, Eye } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslation } from "@/lib/i18n";

const galleryData = [
	{
		id: 1,
		title: "ការកាត់សក់ដោយឥតគិតថ្លៃ",
		title_en: "Free Haircut Service",
		category: "community",
		date: "2024-01-15",
		image:
			"https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "សកម្មភាពកាត់សក់ដោយឥតគិតថ្លៃដល់ប្រជាជនក្នុងសហគមន៍",
		views: 1250,
	},
	{
		id: 2,
		title: "ការបង្រៀនកុមារ",
		title_en: "Teaching Children",
		category: "education",
		date: "2024-01-10",
		image:
			"https://images.pexels.com/photos/5427652/pexels-photo-5427652.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/5427652/pexels-photo-5427652.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការបង្រៀនភាសាខ្មែរ និងជំនាញផ្សេងៗដល់កុមារ",
		views: 890,
	},
	{
		id: 3,
		title: "ការប្រកួតរបាំប្រពៃណី",
		title_en: "Traditional Dance Competition",
		category: "culture",
		date: "2024-01-05",
		image:
			"https://images.pexels.com/photos/8369686/pexels-photo-8369686.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/8369686/pexels-photo-8369686.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការប្រកួតរបាំអប្សរា និងរបាំកំសាន្ត",
		views: 650,
	},
	{
		id: 4,
		title: "ការបរិច្ចាគអាហារ",
		title_en: "Food Donation",
		category: "community",
		date: "2023-12-20",
		image:
			"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការបរិច្ចាគអាហារដល់គ្រួសារក្រីក្រ",
		views: 920,
	},
	{
		id: 5,
		title: "ការបណ្តុះបណ្តាលជំនាញ",
		title_en: "Skills Training",
		category: "education",
		date: "2023-12-15",
		image:
			"https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការបណ្តុះបណ្តាលជំនាញបច្ចេកទេស",
		views: 750,
	},
	{
		id: 6,
		title: "ការប្រកួតកីឡា",
		title_en: "Sports Competition",
		category: "sports",
		date: "2023-12-10",
		image:
			"https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការប្រកួតកីឡាក្នុងសហគមន៍",
		views: 680,
	},
	{
		id: 7,
		title: "ការបង្រៀនតន្ត្រី",
		title_en: "Music Lessons",
		category: "culture",
		date: "2023-12-05",
		image:
			"https://images.pexels.com/photos/7964734/pexels-photo-7964734.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/7964734/pexels-photo-7964734.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការបង្រៀនតន្ត្រីប្រពៃណីខ្មែរ",
		views: 420,
	},
	{
		id: 8,
		title: "ការជួសជុលផ្ទះ",
		title_en: "House Repair",
		category: "community",
		date: "2023-11-30",
		image:
			"https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការជួសជុលផ្ទះដល់ប្រជាជន",
		views: 830,
	},
	{
		id: 9,
		title: "ការប្រកួតកីឡាតុក្កតា",
		title_en: "Table Tennis Tournament",
		category: "sports",
		date: "2023-11-25",
		image:
			"https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការប្រកួតកីឡាតុក្កតាយុវជន",
		views: 560,
	},
	{
		id: 10,
		title: "ការបង្រៀនរបាំ",
		title_en: "Dance Lessons",
		category: "culture",
		date: "2023-11-20",
		image:
			"https://images.pexels.com/photos/8369687/pexels-photo-8369687.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/8369687/pexels-photo-8369687.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការបង្រៀនរបាំប្រពៃណីដល់កុមារ",
		views: 720,
	},
	{
		id: 11,
		title: "ការចែកចាយសម្ភារៈ",
		title_en: "Supply Distribution",
		category: "community",
		date: "2023-11-15",
		image:
			"https://images.pexels.com/photos/6646851/pexels-photo-6646851.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/6646851/pexels-photo-6646851.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការចែកចាយសម្ភារៈសិក្សាដល់កុមារ",
		views: 940,
	},
	{
		id: 12,
		title: "ការបណ្តុះបណ្តាលកុមារ",
		title_en: "Children Training",
		category: "education",
		date: "2023-11-10",
		image:
			"https://images.pexels.com/photos/5427665/pexels-photo-5427665.jpeg?auto=compress&cs=tinysrgb&w=1200",
		thumbnail:
			"https://images.pexels.com/photos/5427665/pexels-photo-5427665.jpeg?auto=compress&cs=tinysrgb&w=400",
		description: "ការបណ្តុះបណ្តាលជំនាញដល់កុមារ",
		views: 610,
	},
];

const categories = [
	{ id: "all", name: "ទាំងអស់", name_en: "All" },
	{ id: "community", name: "សហគមន៍", name_en: "Community" },
	{ id: "education", name: "ការអប់រំ", name_en: "Education" },
	{ id: "culture", name: "វប្បធម៌", name_en: "Culture" },
	{ id: "sports", name: "កីឡា", name_en: "Sports" },
];

export default function GalleryPage() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedImage, setSelectedImage] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { t } = useTranslation();

	const filteredImages =
		selectedCategory === "all"
			? galleryData
			: galleryData.filter((item) => item.category === selectedCategory);

	const handleImageClick = (image: any) => {
		setSelectedImage(image);
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative py-24 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
				<div className="container">
					<AnimatedSection className="text-center max-w-4xl mx-auto">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.8 }}
							className="w-20 h-20 bg-gradient-to-br from-khmer-gold to-khmer-red rounded-full flex items-center justify-center mx-auto mb-6"
						>
							<ZoomIn className="w-10 h-10 text-white" />
						</motion.div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
							{t("nav.gallery")}
						</h1>

						<p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
							ស្វែងយល់ពីសកម្មភាព និងការគម្រោងរបស់យើងតាមរយៈរូបភាព
						</p>
					</AnimatedSection>
				</div>
			</section>

			{/* Gallery Section */}
			<section className="section-padding bg-white">
				<div className="container">
					<AnimatedSection className="mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
							រូបភាពសកម្មភាព
							<span className="block text-xl md:text-2xl gradient-text mt-2">
								Activity Gallery
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
							<motion.div
								layout
								className="grid grid-cols-1 md:grid-cols-2 gap-6"
							>
								<AnimatePresence>
									{filteredImages.map((item, index) => (
										<motion.div
											key={item.id}
											layout
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -20 }}
											transition={{ duration: 0.3, delay: index * 0.05 }}
										>
											<Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
												<div
													className="relative aspect-square overflow-hidden"
													onClick={() => handleImageClick(item)}
												>
													<img
														src={item.thumbnail}
														alt={item.title}
														className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
														loading="lazy"
													/>

													{/* Overlay */}
													<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

													{/* Zoom Icon */}
													<motion.div
														className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
														whileHover={{ scale: 1.1 }}
														whileTap={{ scale: 0.9 }}
													>
														<div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
															<ZoomIn className="w-5 h-5 text-khmer-gold" />
														</div>
													</motion.div>

													{/* Category Badge */}
													<div className="absolute top-3 left-3">
														<Badge className="bg-khmer-gold text-white text-xs">
															{
																categories.find((c) => c.id === item.category)
																	?.name_en
															}
														</Badge>
													</div>
												</div>

												<CardContent className="p-4">
													<h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-khmer-gold transition-colors">
														{item.title_en}
													</h3>

													<p className="text-gray-600 text-sm mb-3 line-clamp-2">
														{item.description}
													</p>

													<div className="flex items-center justify-between text-xs text-gray-500">
														<div className="flex items-center">
															<Calendar className="w-3 h-3 mr-1" />
															{new Date(item.date).toLocaleDateString("km-KH")}
														</div>
														<div className="flex items-center">
															<Eye className="w-3 h-3 mr-1" />
															{item.views}
														</div>
													</div>
												</CardContent>
											</Card>
										</motion.div>
									))}
								</AnimatePresence>
							</motion.div>
						</TabsContent>
					</Tabs>

					{filteredImages.length === 0 && (
						<div className="text-center py-12">
							<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<ZoomIn className="w-8 h-8 text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								រកមិនឃើញរូបភាព
							</h3>
							<p className="text-gray-600">មិនមានរូបភាពក្នុងប្រភេទនេះនៅឡើយទេ</p>
						</div>
					)}
				</div>
			</section>

			{/* Image Modal */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-5xl w-full p-0">
					{selectedImage && (
						<div className="relative">
							<Button
								variant="ghost"
								size="icon"
								className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
								onClick={() => setIsModalOpen(false)}
							>
								<X className="w-6 h-6" />
							</Button>

							<div className="relative">
								<img
									src={selectedImage.image}
									alt={selectedImage.title}
									className="w-full max-h-[80vh] object-contain"
								/>

								{/* Image Info Overlay */}
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
									<div className="flex items-center space-x-4 mb-3">
										<Badge className="bg-khmer-gold text-white">
											{
												categories.find((c) => c.id === selectedImage.category)
													?.name_en
											}
										</Badge>
										<div className="flex items-center text-white/80 text-sm">
											<Calendar className="w-4 h-4 mr-1" />
											{new Date(selectedImage.date).toLocaleDateString("km-KH")}
										</div>
										<div className="flex items-center text-white/80 text-sm">
											<Eye className="w-4 h-4 mr-1" />
											{selectedImage.views} views
										</div>
									</div>

									<h3 className="text-2xl font-bold text-white mb-2">
										{selectedImage.title_en}
									</h3>

									<p className="text-white/90 leading-relaxed">
										{selectedImage.description}
									</p>
								</div>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
