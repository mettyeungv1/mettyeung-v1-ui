"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RelatedArticlesProps {
	currentArticleId: number;
}

const relatedArticles = [
	{
		id: 2,
		title: "ការបង្រៀនភាសាខ្មែរដល់កុមារ 50 នាក់",
		title_en: "Khmer Language Classes for 50 Children",
		excerpt: "កម្មវិធីបង្រៀនភាសាខ្មែរ និងសំណេរដល់កុមារក្នុងតំបន់ជនបទ",
		category: "education",
		date: "2024-01-10",
		image:
			"https://images.pexels.com/photos/5427652/pexels-photo-5427652.jpeg?auto=compress&cs=tinysrgb&w=400",
		views: 890,
	},
	{
		id: 3,
		title: "ការប្រកួតរបាំប្រពៃណីខ្មែរ",
		title_en: "Traditional Khmer Dance Competition",
		excerpt: "ការរៀបចំការប្រកួតរបាំប្រពៃណីខ្មែរ ដើម្បីលើកកម្ពស់វប្បធម៌ជាតិ",
		category: "culture",
		date: "2024-01-05",
		image:
			"https://images.pexels.com/photos/8369686/pexels-photo-8369686.jpeg?auto=compress&cs=tinysrgb&w=400",
		views: 650,
	},
	{
		id: 4,
		title: "ការបរិច្ចាគអាហារដល់គ្រួសារក្រីក្រ",
		title_en: "Food Donation to Poor Families",
		excerpt:
			"ក្រុម Mettyerng បានបរិច្ចាគអាហារ និងសម្ភារៈចាំបាច់ដល់គ្រួសារក្រីក្រ",
		category: "community",
		date: "2023-12-20",
		image:
			"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400",
		views: 920,
	},
];

export function RelatedArticles({ currentArticleId }: RelatedArticlesProps) {
	const filtered = relatedArticles.filter(
		(article) => article.id !== currentArticleId
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">ព័ត៌មានពាក់ព័ន្ធ</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{filtered.map((article) => (
					<div key={article.id} className="group cursor-pointer">
						<div className="flex space-x-3">
							<div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
								<img
									src={article.image}
									alt={article.title_en}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<Badge variant="secondary" className="text-xs mb-1">
									{article.category}
								</Badge>
								<h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-khmer-gold transition-colors">
									{article.title_en}
								</h4>
								<div className="flex items-center text-xs text-gray-500 space-x-3">
									<div className="flex items-center">
										<Calendar className="w-3 h-3 mr-1" />
										{new Date(article.date).toLocaleDateString("km-KH")}
									</div>
									<div className="flex items-center">
										<Eye className="w-3 h-3 mr-1" />
										{article.views}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}

				<div className="pt-4 border-t border-gray-200">
					<Button
						variant="outline"
						className="w-full text-khmer-gold border-khmer-gold hover:bg-khmer-gold hover:text-white"
					>
						មើលព័ត៌មានបន្ថែម
						<ArrowRight className="w-4 h-4 ml-2" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
