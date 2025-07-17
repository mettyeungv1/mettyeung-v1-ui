"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
	Calendar,
	User,
	Eye,
	Share2,
	Facebook,
	Twitter,
	Link,
	ChevronLeft,
	ChevronRight,
	MessageCircle,
	Clock,
	Tag,
	ArrowRight,
	Mail,
	Phone,
	MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ShareDialog } from "@/components/news/share-dialog";
import { RelatedArticles } from "@/components/news/related-articles";
import { CommentSection } from "@/components/news/comment-section";
import { NewsProgress } from "@/components/news/news-progress";
import { ImageGallery } from "@/components/news/image-gallery";
import { useTranslation } from "@/lib/i18n";

// Sample article data - in real app, this would come from API/database
const articleData = {
	id: 1,
	title: "ការកាត់សក់ដោយឥតគិតថ្លៃ ចំនួន 200 នាក់",
	title_en: "Free Haircuts for 200 People",
	excerpt:
		"ក្រុម Mettyerng បានរៀបចំកម្មវិធីកាត់សក់ដោយឥតគិតថ្លៃ ដល់ប្រជាជនដែលមានស្ថានភាពពិបាក",
	content: `
    <h2>ផ្តើមសកម្មភាពសេវាសាធារណៈ</h2>
    <p>ក្នុងកម្មវិធីបេរ័ត្នសង្គមនេះ យើងបានអាចជួយដល់ប្រជាជន 200 នាក់ ដោយផ្តល់សេវាកម្មកាត់សក់ដោយឥតគិតថ្លៃ។ សកម្មភាពនេះបានធ្វើឡើងនៅទីលាន Mettyerng ក្នុងរយៈពេល 3 ថ្ងៃ ចាប់ពីថ្ងៃទី 12 ដល់ថ្ងៃទី 15 ខែមករា ឆ្នាំ 2024។</p>
    
    <p>កម្មវិធីនេះបានទទួលការចូលរួមយ៉ាងសកម្មពីសំណាក់ប្រជាជនក្នុងតំបន់ ដែលភាគច្រើនជាគ្រួសារដែលមានស្ថានភាពសេដ្ឋកិច្ចមិនសូវល្អ។ យើងបានឃើញការរីករាយ និងការកោតសរសើរយ៉ាងខ្លាំងពីអ្នកទទួលផលទាំងអស់។</p>
    
    <h3>គោលបំណងនៃកម្មវិធី</h3>
    <p>កម្មវិធីនេះមានគោលបំណងជួយប្រជាជនដែលមានស្ថានភាពពិបាក និងមិនមានលទ្ធភាពទិញសេវាកម្មកាត់សក់។ យើងជឿជាក់ថាការមានរូបរាងស្អាតគឺជាសិទ្ធិមូលដ្ឋានរបស់មនុស្សគ្រប់គ្នា។</p>
    
    <p>លើសពីនេះ កម្មវិធីនេះក៏ជាការលើកកម្ពស់ស្មារតីសាមគ្គីភាពក្នុងសហគមន៍ និងការបង្ហាញពីការយកចិត្តទុកដាក់របស់ក្រុម Mettyerng ចំពោះសុខុមាលភាពរបស់ប្រជាជន។</p>
    
    <blockquote>
      "ការជួយគ្នាទៅវិញទៅមកគឺជាវប្បធម៌ដ៏ល្អរបស់ខ្មែរ ដែលយើងត្រូវរក្សាបន្ត" - ប្រធានក្រុម Mettyerng
    </blockquote>
    
    <h3>ការរៀបចំ និងអ្នកចូលរួម</h3>
    <p>ក្រុមការងារដែលមានជំនាញខ្ពស់ចំនួន 15 នាក់ បានចូលរួមក្នុងកម្មវិធីនេះ។ ពួកគេបានមកពីហាងកាត់សក់ផ្សេងៗក្នុងរាជធានីភ្នំពេញ ហើយបានអាសន្នមកធ្វើការជាមួយយើងដោយឥតគិតថ្លៃ។</p>
    
    <p>ការរៀបចំកម្មវិធីនេះត្រូវបានធ្វើឡើងយ៉ាងប្រុងប្រយ័ត្ន ដោយមានការត្រៀមរៀបចំទីតាំង ការបំពាក់ឧបករណ៍ និងការសម្របសម្រួលកាលវិភាគឱ្យបានសមស្រប។</p>
    
    <h4>ការបំពាក់ដែលបានប្រើ</h4>
    <ul>
      <li>កន្ទ្រៃកាត់សក់ទំនើប</li>
      <li>ម៉ាស៊ីនកាត់សក់អគ្គិសនី</li>
      <li>ទឹកលាងសក់ និងឧបករណ៍ជួយ</li>
      <li>អាវក្រោមការពារ</li>
      <li>កៅអីសម្រាប់អ្នកទទួលសេវា</li>
      <li>កញ្ចក់ និងឧបករណ៍បំពាក់ផ្សេងៗ</li>
    </ul>
    
    <h3>លទ្ធផល និងរឿងរ៉ាវ</h3>
    <p>តាមរយៈកម្មវិធីនេះ យើងបានឃើញស្នាមញញឹមនៅលើមុខរបស់អ្នកទទួលផល។ ពួកគេមានអារម្មណ៍ថាកាន់តែមានទំនុកចិត្ត និងរីករាយបន្ទាប់ពីបានកាត់សក់ថ្មី។</p>
    
    <p>មានរឿងរ៉ាវជាច្រើនដែលធ្វើឱ្យយើងមានអារម្មណ៍ថាកម្មវិធីនេះពិតជាមានន័យ។ ក្មេងប្រុសម្នាក់បាននិយាយថា គាត់មានអារម្មណ៍ថាខ្លួនឯងកាន់តែស្អាត និងមានទំនុកចិត្តក្នុងការទៅសាលារៀន។ ចំណែកឯមាតាវ័យចំណាស់ម្នាក់វិញ បានអរគុណយ៉ាងជ្រាលជ្រៅ ព្រោះនាងមិនធ្លាប់មានលទ្ធភាពកាត់សក់នៅហាងអស់រយៈពេលជាច្រើនខែមកហើយ។</p>
    
    <h3>ផលប៉ះពាល់វិជ្ជមាន</h3>
    <p>កម្មវិធីនេះមិនត្រឹមតែជួយដល់អ្នកទទួលផលប៉ុណ្ណោះទេ ប៉ុន្តែថែមទាំងបានបង្កើតឱកាសឱ្យអ្នកជំនាញកាត់សក់បានចូលរួមធ្វើសេវាកម្មសង្គម។ ពួកគេបានបង្ហាញពីចិត្តសប្បុរសធម៌ និងការយកចិត្តទុកដាក់ចំពោះសហគមន៍។</p>
    
    <p>លើសពីនេះ កម្មវិធីនេះក៏បានជួយលើកកម្ពស់ភាពជិតស្និទ្ធក្នុងសហគមន៍ ដោយប្រជាជនបានមកជួបជុំគ្នា ចែករំលែកបទពិសោធន៍ និងបង្កើតទំនាក់ទំនងល្អៗ។</p>
    
    <h3>ផែនការអនាគត</h3>
    <p>យើងមានបំណងធ្វើកម្មវិធីបែបនេះជាទៀងទាត់ គឺមួយដងក្នុងមួយត្រីមាស។ នៅខែបន្ទាប់ យើងនឹងរៀបចំកម្មវិធីពិនិត្យសុខភាពដោយឥតគិតថ្លៃ។</p>
    
    <p>ក្រុម Mettyerng សង្ឃឹមថានឹងអាចពង្រីកកម្មវិធីនេះទៅកាន់តំបន់ជនបទផ្សេងៗទៀត ដើម្បីឱ្យប្រជាជនកាន់តែច្រើនអាចទទួលបានអត្ថប្រយោជន៍។ យើងក៏កំពុងស្វែងរកដៃគូសហការថ្មីៗ ដើម្បីធ្វើឱ្យកម្មវិធីនេះកាន់តែមានប្រសិទ្ធភាព។</p>
    
    <p>សម្រាប់អ្នកដែលចង់ចូលរួមជាអ្នកស្ម័គ្រចិត្ត ឬចង់ផ្តល់ការគាំទ្រ សូមទាក់ទងមកក្រុមយើងតាមរយៈព័ត៌មានទំនាក់ទំនងខាងក្រោម។</p>
  `,
	category: "community",
	author: {
		name: "ក្រុមការងារ Mettyerng",
		name_en: "Mettyerng Team",
		avatar:
			"https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=150",
		bio: "ក្រុមការងារ Mettyerng គឺជាអង្គការមិនស្វែងរកប្រាក់ចំណេញ ដែលផ្តោតលើការជួយសង្គម",
		bio_en:
			"Mettyerng Team is a non-profit organization focused on community support and social services.",
		email: "info@mettyerng.org",
		phone: "+855 12 345 678",
		location: "ភ្នំពេញ, កម្ពុជា",
	},
	date: "2024-01-15",
	readTime: "5 នាទី",
	image:
		"https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200",
	gallery: [
		{
			url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption: "ការកាត់សក់ដោយអ្នកជំនាញ",
		},
		{
			url: "https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption: "ប្រជាជនកំពុងរង់ចាំ",
		},
		{
			url: "https://images.pexels.com/photos/3738674/pexels-photo-3738674.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption: "ការរៀបចំឧបករណ៍",
		},
		{
			url: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption: "ការកាត់សក់សម្រាប់កុមារ",
		},
		{
			url: "https://images.pexels.com/photos/3738675/pexels-photo-3738675.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption: "ក្រុមការងារអ្នកជំនាញ",
		},
		{
			url: "https://images.pexels.com/photos/3738676/pexels-photo-3738676.jpeg?auto=compress&cs=tinysrgb&w=800",
			caption: "ការបរិច្ចាគសម្ភារៈ",
		},
	],
	featured: true,
	views: 1250,
	comments: 23,
	tags: ["community", "social-service", "free-haircuts", "mettyerng"],
	publishedAt: "2024-01-15T10:30:00Z",
	updatedAt: "2024-01-15T15:45:00Z",
};

export default function NewsDetailPage({ params }: { params: { id: string } }) {
	const [showShareDialog, setShowShareDialog] = useState(false);
	const { t } = useTranslation();

	const handleShare = async (platform: string) => {
		const url = window.location.href;
		const title = articleData.title_en;

		switch (platform) {
			case "facebook":
				window.open(
					`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
						url
					)}`
				);
				break;
			case "twitter":
				window.open(
					`https://twitter.com/intent/tweet?url=${encodeURIComponent(
						url
					)}&text=${encodeURIComponent(title)}`
				);
				break;
			case "copy":
				await navigator.clipboard.writeText(url);
				// Show toast notification
				break;
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<NewsProgress />

			{/* Breadcrumb */}
			<div className="bg-gray-50 py-4 border-b">
				<div className="container">
					<nav className="flex items-center space-x-2 text-sm text-gray-600">
						<a href="/" className="hover:text-khmer-gold transition-colors">
							ទំព័រដើម
						</a>
						<ChevronRight className="w-4 h-4" />
						<a href="/news" className="hover:text-khmer-gold transition-colors">
							ព័ត៌មាន
						</a>
						<ChevronRight className="w-4 h-4" />
						<span className="text-gray-900 font-medium">
							កម្មវិធីសេវាសាធារណៈ
						</span>
					</nav>
				</div>
			</div>

			<div className="container py-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-8">
						<AnimatedSection>
							<article className="max-w-none">
								{/* Article Header */}
								<header className="mb-8">
									<div className="flex items-center space-x-4 mb-6">
										<Badge className="bg-khmer-gold text-white px-3 py-1 text-sm">
											សហគមន៍ Community
										</Badge>
										<div className="flex items-center text-sm text-gray-500">
											<Calendar className="w-4 h-4 mr-1" />
											{new Date(articleData.date).toLocaleDateString("km-KH")}
										</div>
										<div className="flex items-center text-sm text-gray-500">
											<Clock className="w-4 h-4 mr-1" />
											{articleData.readTime}
										</div>
										<div className="flex items-center text-sm text-gray-500">
											<Eye className="w-4 h-4 mr-1" />
											{articleData.views.toLocaleString()} views
										</div>
									</div>

									<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
										{articleData.title_en}
									</h1>

									<p className="text-xl text-gray-600 leading-relaxed mb-8">
										{articleData.excerpt}
									</p>

									{/* Share Actions */}
									<div className="flex items-center justify-between py-4 border-t border-b border-gray-200 mb-8">
										<div className="flex items-center space-x-6">
											<div className="flex items-center text-sm text-gray-500">
												<MessageCircle className="w-4 h-4 mr-1" />
												{articleData.comments} មតិយោបល់
											</div>
										</div>

										<div className="flex items-center space-x-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() => setShowShareDialog(true)}
												className="text-khmer-gold border-khmer-gold hover:bg-khmer-gold hover:text-white"
											>
												<Share2 className="w-4 h-4 mr-1" />
												ចែករំលែក
											</Button>
										</div>
									</div>
								</header>

								{/* Featured Image */}
								<div className="mb-8">
									<div className="aspect-video rounded-xl overflow-hidden shadow-lg">
										<img
											src={articleData.image}
											alt={articleData.title_en}
											className="w-full h-full object-cover"
										/>
									</div>
								</div>

								{/* Image Gallery */}
								<ImageGallery images={articleData.gallery} />

								{/* Author Info */}
								<div className="bg-gradient-to-r from-gray-50 to-khmer-gold/5 rounded-xl p-6 mb-8 border border-gray-100">
									<div className="flex items-start space-x-4">
										<Avatar className="w-16 h-16 ring-2 ring-khmer-gold/20">
											<AvatarImage
												src={articleData.author.avatar}
												alt={articleData.author.name_en}
											/>
											<AvatarFallback className="bg-khmer-gold text-white">
												{articleData.author.name_en.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1">
											<h4 className="text-lg font-semibold text-gray-900 mb-2">
												{articleData.author.name_en}
											</h4>
											<p className="text-gray-600 text-sm leading-relaxed mb-3">
												{articleData.author.bio_en}
											</p>
											<div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
												{articleData.author.email && (
													<div className="flex items-center">
														<Mail className="w-3 h-3 mr-1" />
														{articleData.author.email}
													</div>
												)}
												{articleData.author.phone && (
													<div className="flex items-center">
														<Phone className="w-3 h-3 mr-1" />
														{articleData.author.phone}
													</div>
												)}
												{articleData.author.location && (
													<div className="flex items-center">
														<MapPin className="w-3 h-3 mr-1" />
														{articleData.author.location}
													</div>
												)}
											</div>
										</div>
									</div>
								</div>

								{/* Article Content */}
								<div
									className="prose prose-lg max-w-none 
                    prose-headings:text-gray-900 prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-khmer-gold
                    prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2 prose-h4:font-semibold
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-ul:my-4 prose-li:text-gray-700 prose-li:mb-1
                    prose-blockquote:not-italic prose-blockquote:font-normal"
									dangerouslySetInnerHTML={{ __html: articleData.content }}
								/>

								{/* Tags */}
								<div className="mt-12 pt-6 border-t border-gray-200">
									<div className="flex flex-wrap items-center gap-2">
										<Tag className="w-4 h-4 text-gray-500 mr-2" />
										{articleData.tags.map((tag) => (
											<Badge
												key={tag}
												variant="secondary"
												className="text-xs hover:bg-khmer-gold hover:text-white transition-colors cursor-pointer"
											>
												#{tag}
											</Badge>
										))}
									</div>
								</div>

								{/* Social Share */}
								<div className="mt-8 pt-6 border-t border-gray-200">
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
										<span className="text-sm font-medium text-gray-900">
											ចែករំលែកមិត្តភក្តិ:
										</span>
										<div className="flex items-center space-x-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleShare("facebook")}
												className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
											>
												<Facebook className="w-4 h-4 mr-1" />
												Facebook
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleShare("twitter")}
												className="text-sky-600 border-sky-600 hover:bg-sky-600 hover:text-white"
											>
												<Twitter className="w-4 h-4 mr-1" />
												Twitter
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleShare("copy")}
												className="text-gray-600 border-gray-600 hover:bg-gray-600 hover:text-white"
											>
												<Link className="w-4 h-4 mr-1" />
												ចម្លងតំណ
											</Button>
										</div>
									</div>
								</div>
							</article>
						</AnimatedSection>

						{/* Comments Section */}
						<div className="mt-16">
							<CommentSection articleId={articleData.id} />
						</div>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-4">
						<div className="sticky top-24 space-y-6">
							{/* Quick Info */}
							<Card className="border-l-4 border-l-khmer-gold">
								<CardContent className="p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">
										ព័ត៌មានលម្អិត
									</h3>
									<div className="space-y-3 text-sm">
										<div className="flex items-center justify-between">
											<span className="text-gray-600">កាលបរិច្ឆេទ:</span>
											<span className="font-medium">
												{new Date(articleData.date).toLocaleDateString("km-KH")}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">ពេលអាន:</span>
											<span className="font-medium">
												{articleData.readTime}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">ចំនួនអ្នកមើល:</span>
											<span className="font-medium">
												{articleData.views.toLocaleString()}
											</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-gray-600">មតិយោបល់:</span>
											<span className="font-medium">
												{articleData.comments}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Related Articles */}
							<RelatedArticles currentArticleId={articleData.id} />

							{/* Newsletter Signup */}
							<Card className="bg-gradient-to-br from-khmer-gold/5 to-khmer-red/5 border-khmer-gold/20">
								<CardContent className="p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-3">
										ទទួលព័ត៌មានថ្មីៗ
									</h3>
									<p className="text-sm text-gray-600 mb-4">
										ចូលរួមជាមួយយើងដើម្បីទទួលបានព័ត៌មានថ្មីៗ និងកម្មវិធីសំខាន់ៗ
									</p>
									<div className="space-y-3">
										<input
											type="email"
											placeholder="អុីម៉ែលរបស់អ្នក"
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-khmer-gold focus:border-transparent text-sm"
										/>
										<Button className="w-full bg-khmer-gold hover:bg-khmer-gold-dark text-white py-3">
											ចុះឈ្មោះ
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>

			{/* Share Dialog */}
			<ShareDialog
				isOpen={showShareDialog}
				onClose={() => setShowShareDialog(false)}
				onShare={handleShare}
				article={articleData}
			/>
		</div>
	);
}
