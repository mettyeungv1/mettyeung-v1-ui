"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
	Search,
	Calendar,
	User,
	Tag,
	ArrowRight,
	Filter,
	Eye,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/lib/i18n";
import { useRouter } from "next/navigation";

const newsData = [
	{
		id: 1,
		title: "ការកាត់សក់ដោយឥតគិតថ្លៃ ចំនួន 200 នាក់",
		title_en: "Free Haircuts for 200 People",
		excerpt:
			"ក្រុម Mettyerng បានរៀបចំកម្មវិធីកាត់សក់ដោយឥតគិតថ្លៃ ដល់ប្រជាជនដែលមានស្ថានភាពពិបាក",
		content: "ក្នុងកម្មវិធីបេរ័ត្នសង្គមនេះ យើងបានអាចជួយដល់ប្រជាជន 200 នាក់...",
		category: "community",
		author: "ក្រុមការងារ Mettyerng",
		date: "2024-01-15",
		image:
			"https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
		featured: true,
		views: 1250,
	},
	{
		id: 2,
		title: "ការបង្រៀនភាសាខ្មែរដល់កុមារ 50 នាក់",
		title_en: "Khmer Language Classes for 50 Children",
		excerpt: "កម្មវិធីបង្រៀនភាសាខ្មែរ និងសំណេរដល់កុមារក្នុងតំបន់ជនបទ",
		content: "ការអប់រំគឺជាមូលដ្ឋានសំខាន់បំផុតនៃការអភិវឌ្ឍន៍...",
		category: "education",
		author: "អ្នកស្រី គិម សុផល",
		date: "2024-01-10",
		image:
			"https://images.pexels.com/photos/5427652/pexels-photo-5427652.jpeg?auto=compress&cs=tinysrgb&w=800",
		featured: false,
		views: 890,
	},
	{
		id: 3,
		title: "ការប្រកួតរបាំប្រពៃណីខ្មែរ",
		title_en: "Traditional Khmer Dance Competition",
		excerpt: "ការរៀបចំការប្រកួតរបាំប្រពៃណីខ្មែរ ដើម្បីលើកកម្ពស់វប្បធម៌ជាតិ",
		content: "វប្បធម៌ខ្មែរគឺជាទ្រព្យសម្បត្តិដ៏មានតម្លៃ...",
		category: "culture",
		author: "លោក ខៀវ ផាណា",
		date: "2024-01-05",
		image:
			"https://images.pexels.com/photos/8369686/pexels-photo-8369686.jpeg?auto=compress&cs=tinysrgb&w=800",
		featured: false,
		views: 650,
	},
	{
		id: 4,
		title: "ការបរិច្ចាគអាហារដល់គ្រួសារក្រីក្រ",
		title_en: "Food Donation to Poor Families",
		excerpt:
			"ក្រុម Mettyerng បានបរិច្ចាគអាហារ និងសម្ភារៈចាំបាច់ដល់គ្រួសារក្រីក្រ",
		content: "ក្នុងកំឡុងពេលដ៏លំបាកនេះ ការជួយគ្នាទៅវិញទៅមកគឺជាការចាំបាច់...",
		category: "community",
		author: "ក្រុមការងារ Mettyerng",
		date: "2023-12-20",
		image:
			"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
		featured: false,
		views: 920,
	},
	{
		id: 5,
		title: "ការបណ្តុះបណ្តាលជំនាញកុមារ",
		title_en: "Children Skills Development Workshop",
		excerpt: "កម្មវិធីបណ្តុះបណ្តាលជំនាញដល់កុមារ ដើម្បីរៀបចំខ្លួនសម្រាប់អនាគត",
		content: "ការបណ្តុះបណ្តាលជំនាញគឺជាការវិនិយោគសម្រាប់អនាគត...",
		category: "education",
		author: "អ្នកស្រី ពេជ្រ មាលា",
		date: "2023-12-15",
		image:
			"https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=800",
		featured: false,
		views: 750,
	},
	{
		id: 6,
		title: "ការប្រកួតកីឡាក្នុងសហគមន៍",
		title_en: "Community Sports Competition",
		excerpt: "ការរៀបចំការប្រកួតកីឡាតុក្កតា និងបាល់បោះ ដើម្បីកសាងសាមគ្គីភាព",
		content: "កីឡាគឺជាមធ្យោបាយដ៏ល្អមួយក្នុងការកសាងសាមគ្គីភាព...",
		category: "sports",
		author: "ក្រុមកីឡា",
		date: "2023-12-10",
		image:
			"https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=800",
		featured: false,
		views: 680,
	},
];

const categories = [
	{ id: "all", name: "ទាំងអស់", name_en: "All", count: newsData.length },
	{
		id: "education",
		name: "ការអប់រំ",
		name_en: "Education",
		count: newsData.filter((n) => n.category === "education").length,
	},
	{
		id: "culture",
		name: "វប្បធម៌",
		name_en: "Culture",
		count: newsData.filter((n) => n.category === "culture").length,
	},
	{
		id: "community",
		name: "សហគមន៍",
		name_en: "Community",
		count: newsData.filter((n) => n.category === "community").length,
	},
	{
		id: "sports",
		name: "កីឡា",
		name_en: "Sports",
		count: newsData.filter((n) => n.category === "sports").length,
	},
];

export default function NewsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const { t } = useTranslation();
	const router = useRouter();

	const moveToDetail = (id: any) => router.push("/news/asdfasdf");
	const filteredNews = useMemo(() => {
		let filtered = newsData;

		if (selectedCategory !== "all") {
			filtered = filtered.filter((item) => item.category === selectedCategory);
		}

		if (searchTerm) {
			filtered = filtered.filter(
				(item) =>
					item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		return filtered;
	}, [searchTerm, selectedCategory]);

	const featuredNews = newsData.filter((item) => item.featured);
	const recentNews = newsData.filter((item) => !item.featured).slice(0, 3);

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative py-24 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
				<div className="container">
					<AnimatedSection className="text-center max-w-4xl mx-auto">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
							{t("nav.news")}
						</h1>
						<p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
							ស្វែងយល់ពីសកម្មភាព និងព្រឹត្តិការណ៍ចុងក្រោយរបស់យើង
						</p>
					</AnimatedSection>
				</div>
			</section>

			{/* Featured News */}
			{featuredNews.length > 0 && (
				<section className="section-padding bg-white">
					<div className="container">
						<AnimatedSection className="mb-12">
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
								ព័ត៌មានសំខាន់
								<span className="block text-xl md:text-2xl gradient-text mt-2">
									Featured News
								</span>
							</h2>
						</AnimatedSection>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{featuredNews.map((item, index) => (
								<AnimatedSection key={item.id} delay={index * 0.2}>
									<Card
										className="overflow-hidden hover:shadow-2xl transition-all duration-500 group  cursor-pointer"
										onClick={moveToDetail}
									>
										<div className="aspect-video overflow-hidden">
											<img
												src={item.image}
												alt={item.title}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
											/>
										</div>
										<CardContent className="p-6">
											<div className="flex items-center space-x-4 mb-4">
												<Badge className="bg-khmer-gold text-white">
													{
														categories.find((c) => c.id === item.category)
															?.name_en
													}
												</Badge>
												<div className="flex items-center text-sm text-gray-500">
													<Calendar className="w-4 h-4 mr-1" />
													{new Date(item.date).toLocaleDateString("km-KH")}
												</div>
												<div className="flex items-center text-sm text-gray-500">
													<Eye className="w-4 h-4 mr-1" />
													{item.views}
												</div>
											</div>

											<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-khmer-gold transition-colors">
												{item.title_en}
											</h3>

											<p className="text-gray-600 leading-relaxed mb-4">
												{item.excerpt}
											</p>

											<div className="flex items-center justify-between">
												<div className="flex items-center text-sm text-gray-500">
													<User className="w-4 h-4 mr-1" />
													{item.author}
												</div>
												<Button
													variant="ghost"
													className="text-khmer-gold hover:text-khmer-gold-dark p-0"
												>
													អានបន្ត
													<ArrowRight className="ml-2 w-4 h-4" />
												</Button>
											</div>
										</CardContent>
									</Card>
								</AnimatedSection>
							))}
						</div>
					</div>
				</section>
			)}

			{/* News Filter & List */}
			<section className="section-padding bg-gray-50">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
						{/* Sidebar */}
						<div className="lg:col-span-1">
							<AnimatedSection>
								<Card className="p-6 sticky top-24 hover:cursor-pointer">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">
										ស្វែងរក
									</h3>

									<div className="relative mb-6">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
										<Input
											placeholder="ស្វែងរកព័ត៌មាន..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="pl-10"
										/>
									</div>

									<h4 className="text-sm font-semibold text-gray-900 mb-3">
										ប្រភេទ Categories
									</h4>

									<div className="space-y-2">
										{categories.map((category) => (
											<button
												key={category.id}
												onClick={() => setSelectedCategory(category.id)}
												className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
													selectedCategory === category.id
														? "bg-khmer-gold text-white"
														: "text-gray-600 hover:bg-gray-100"
												}`}
											>
												<div className="flex items-center justify-between">
													<span>{category.name_en}</span>
													<span className="text-xs">({category.count})</span>
												</div>
											</button>
										))}
									</div>

									<div className="mt-8">
										<h4 className="text-sm font-semibold text-gray-900 mb-3">
											ព័ត៌មានថ្មីៗ
										</h4>
										<div className="space-y-4">
											{recentNews.map((item) => (
												<div key={item.id} className="flex space-x-3">
													<div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
														<img
															src={item.image}
															alt={item.title}
															className="w-full h-full object-cover"
														/>
													</div>
													<div className="flex-1 min-w-0">
														<h5 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
															{item.title_en}
														</h5>
														<p className="text-xs text-gray-500">
															{new Date(item.date).toLocaleDateString("km-KH")}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
								</Card>
							</AnimatedSection>
						</div>

						{/* Main Content */}
						<div className="lg:col-span-3">
							<AnimatedSection>
								<div className="flex items-center justify-between mb-8">
									<h2 className="text-2xl font-bold text-gray-900">
										ព័ត៌មានទាំងអស់
										<span className="block text-sm text-gray-500 mt-1">
											រកឃើញ {filteredNews.length} ព័ត៌មាន
										</span>
									</h2>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{filteredNews.map((item, index) => (
										<AnimatedSection key={item.id} delay={index * 0.1}>
											<Card
												className="overflow-hidden hover:shadow-xl transition-all duration-300 group hover:cursor-pointer"
												onClick={moveToDetail}
											>
												<div className="aspect-video overflow-hidden">
													<img
														src={item.image}
														alt={item.title}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
													/>
												</div>
												<CardContent className="p-6">
													<div className="flex items-center space-x-4 mb-3">
														<Badge variant="secondary" className="text-xs">
															{
																categories.find((c) => c.id === item.category)
																	?.name_en
															}
														</Badge>
														<div className="flex items-center text-xs text-gray-500">
															<Calendar className="w-3 h-3 mr-1" />
															{new Date(item.date).toLocaleDateString("km-KH")}
														</div>
													</div>

													<h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-khmer-gold transition-colors line-clamp-2">
														{item.title_en}
													</h3>

													<p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
														{item.excerpt}
													</p>

													<div className="flex items-center justify-between">
														<div className="flex items-center text-xs text-gray-500">
															<User className="w-3 h-3 mr-1" />
															<span className="truncate">{item.author}</span>
														</div>
														<div className="flex items-center text-xs text-gray-500">
															<Eye className="w-3 h-3 mr-1" />
															{item.views}
														</div>
													</div>
												</CardContent>
											</Card>
										</AnimatedSection>
									))}
								</div>

								{filteredNews.length === 0 && (
									<div className="text-center py-12">
										<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<Search className="w-8 h-8 text-gray-400" />
										</div>
										<h3 className="text-lg font-semibold text-gray-900 mb-2">
											រកមិនឃើញព័ត៌មាន
										</h3>
										<p className="text-gray-600">
											សូមព្យាយាមស្វែងរកដោយប្រើពាក្យគន្លឹះផ្សេង
										</p>
									</div>
								)}
							</AnimatedSection>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
