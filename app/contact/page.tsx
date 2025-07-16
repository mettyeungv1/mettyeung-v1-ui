"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
	Phone,
	Mail,
	MapPin,
	Clock,
	Send,
	Facebook,
	Youtube,
	Instagram,
	Heart,
	Users,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n";

const contactInfo = [
	{
		icon: Phone,
		title: "ទូរសព្ទ",
		title_en: "Phone",
		details: ["+855 12 345 678", "+855 10 987 654"],
		href: "tel:+85512345678",
		color: "from-green-500 to-emerald-500",
	},
	{
		icon: Mail,
		title: "អ៊ីមែល",
		title_en: "Email",
		details: ["info@mettyerng.org", "contact@mettyerng.org"],
		href: "mailto:info@mettyerng.org",
		color: "from-blue-500 to-indigo-500",
	},
	{
		icon: MapPin,
		title: "អាសយដ្ឋាន",
		title_en: "Address",
		details: ["ភ្នំពេញ, កម្ពុជា", "ផ្ទះលេខ 123, ផ្លូវ 456"],
		href: "#",
		color: "from-red-500 to-pink-500",
	},
	{
		icon: Clock,
		title: "ម៉ោងបើកធ្វើការ",
		title_en: "Working Hours",
		details: ["ចន្ទ-សុក្រ: 8:00-17:00", "សៅរ៍: 8:00-12:00"],
		href: "#",
		color: "from-purple-500 to-violet-500",
	},
];

const socialLinks = [
	{
		name: "Facebook",
		icon: Facebook,
		href: "https://facebook.com",
		color: "hover:text-blue-600",
	},
	{
		name: "Youtube",
		icon: Youtube,
		href: "https://youtube.com",
		color: "hover:text-red-600",
	},
	{
		name: "Instagram",
		icon: Instagram,
		href: "https://instagram.com",
		color: "hover:text-pink-600",
	},
];

const departments = [
	{ value: "general", label: "ទូទៅ - General Inquiry" },
	{ value: "volunteer", label: "ស្ម័គ្រចិត្ត - Volunteer" },
	{ value: "donation", label: "ការឧបត្ថម្ភ - Donation" },
	{ value: "partnership", label: "ដៃគូ - Partnership" },
	{ value: "media", label: "ផ្សព្វផ្សាយ - Media" },
];

export default function ContactPage() {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		department: "",
		subject: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false);
			alert("សារបានផ្ញើជោគជ័យ! យើងនឹងឆ្លើយតបក្នុងពេលឆាប់ៗ។");
			setFormData({
				name: "",
				email: "",
				phone: "",
				department: "",
				subject: "",
				message: "",
			});
		}, 2000);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
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
							<Mail className="w-10 h-10 text-white" />
						</motion.div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
							{t("contact.title")}
						</h1>

						<p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
							{t("contact.subtitle")}
						</p>
					</AnimatedSection>
				</div>
			</section>

			{/* Contact Info Cards */}
			<section className="section-padding bg-white">
				<div className="container">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							{t("contact.info")}
						</h2>
					</AnimatedSection>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{contactInfo.map((info, index) => (
							<AnimatedSection key={info.title} delay={index * 0.1}>
								<Card className="text-center hover:shadow-xl transition-all duration-300 group">
									<CardContent className="p-6">
										<div
											className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
										>
											<info.icon className="w-8 h-8 text-white" />
										</div>

										<h3 className="text-lg font-bold text-gray-900 mb-2">
											{info.title_en}
										</h3>
										<p className="text-sm text-gray-500 mb-4">{info.title}</p>

										<div className="space-y-1">
											{info.details.map((detail, idx) => (
												<p key={idx} className="text-gray-600 text-sm">
													{detail}
												</p>
											))}
										</div>
									</CardContent>
								</Card>
							</AnimatedSection>
						))}
					</div>
				</div>
			</section>

			{/* Contact Form & Info */}
			<section className="section-padding bg-gray-50">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* Contact Form */}
						<AnimatedSection direction="left">
							<Card className="p-8">
								<CardHeader className="p-0 mb-6">
									<CardTitle className="text-2xl font-bold text-gray-900">
										ផ្ញើសារមកយើង
										<span className="block text-lg text-khmer-gold mt-1">
											Send us a Message
										</span>
									</CardTitle>
								</CardHeader>

								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="name">ឈ្មោះ Name *</Label>
											<Input
												id="name"
												value={formData.name}
												onChange={(e) =>
													handleInputChange("name", e.target.value)
												}
												placeholder="ឈ្មោះរបស់អ្នក"
												required
											/>
										</div>

										<div>
											<Label htmlFor="email">អ៊ីមែល Email *</Label>
											<Input
												id="email"
												type="email"
												value={formData.email}
												onChange={(e) =>
													handleInputChange("email", e.target.value)
												}
												placeholder="your@email.com"
												required
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="phone">ទូរសព្ទ Phone</Label>
											<Input
												id="phone"
												value={formData.phone}
												onChange={(e) =>
													handleInputChange("phone", e.target.value)
												}
												placeholder="+855 12 345 678"
											/>
										</div>

										<div>
											<Label htmlFor="department">ផ្នែក Department *</Label>
											<Select
												value={formData.department}
												onValueChange={(value) =>
													handleInputChange("department", value)
												}
											>
												<SelectTrigger>
													<SelectValue placeholder="ជ្រើសរើសផ្នែក" />
												</SelectTrigger>
												<SelectContent>
													{departments.map((dept) => (
														<SelectItem key={dept.value} value={dept.value}>
															{dept.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</div>

									<div>
										<Label htmlFor="subject">ប្រធានបទ Subject *</Label>
										<Input
											id="subject"
											value={formData.subject}
											onChange={(e) =>
												handleInputChange("subject", e.target.value)
											}
											placeholder="ប្រធានបទនៃសារ"
											required
										/>
									</div>

									<div>
										<Label htmlFor="message">សារ Message *</Label>
										<Textarea
											id="message"
											value={formData.message}
											onChange={(e) =>
												handleInputChange("message", e.target.value)
											}
											placeholder="សរសេរសាររបស់អ្នកនៅទីនេះ..."
											rows={6}
											required
										/>
									</div>

									<Button
										type="submit"
										size="lg"
										disabled={isSubmitting}
										className="w-full bg-gradient-to-r from-khmer-gold to-khmer-red hover:from-khmer-gold-dark hover:to-khmer-red-dark"
									>
										{isSubmitting ? (
											<motion.div
												animate={{ rotate: 360 }}
												transition={{
													duration: 1,
													repeat: Infinity,
													ease: "linear",
												}}
												className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
											/>
										) : (
											<Send className="w-5 h-5 mr-2" />
										)}
										{isSubmitting ? "កំពុងផ្ញើ..." : "ផ្ញើសារ"}
									</Button>
								</form>
							</Card>
						</AnimatedSection>

						{/* Additional Info */}
						<AnimatedSection direction="right">
							<div className="space-y-8">
								{/* Office Hours */}
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-xl font-bold text-gray-900 flex items-center">
											<Clock className="w-6 h-6 text-khmer-gold mr-2" />
											ម៉ោងបើកធ្វើការ
										</CardTitle>
									</CardHeader>
									<div className="space-y-3">
										<div className="flex justify-between items-center">
											<span className="text-gray-600">
												ថ្ងៃចន្ទ - ថ្ងៃសុក្រ
											</span>
											<span className="font-medium">8:00 - 17:00</span>
										</div>
										<Separator />
										<div className="flex justify-between items-center">
											<span className="text-gray-600">ថ្ងៃសៅរ៍</span>
											<span className="font-medium">8:00 - 12:00</span>
										</div>
										<Separator />
										<div className="flex justify-between items-center">
											<span className="text-gray-600">ថ្ងៃអាទិត្យ</span>
											<span className="font-medium text-red-500">បិទ</span>
										</div>
									</div>
								</Card>

								{/* Social Media */}
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-xl font-bold text-gray-900">
											តាមដានយើង
											<span className="block text-sm text-gray-500 mt-1">
												Follow Us on Social Media
											</span>
										</CardTitle>
									</CardHeader>
									<div className="flex space-x-4">
										{socialLinks.map((social) => (
											<Button
												key={social.name}
												variant="outline"
												size="icon"
												asChild
												className={`${social.color} hover:border-current transition-all duration-300`}
											>
												<a
													href={social.href}
													target="_blank"
													rel="noopener noreferrer"
												>
													<social.icon className="w-5 h-5" />
												</a>
											</Button>
										))}
									</div>
								</Card>

								{/* Quick Actions */}
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-xl font-bold text-gray-900">
											សកម្មភាពលឿន
											<span className="block text-sm text-gray-500 mt-1">
												Quick Actions
											</span>
										</CardTitle>
									</CardHeader>
									<div className="space-y-3">
										<Button
											variant="outline"
											size="sm"
											asChild
											className="w-full justify-start"
										>
											<a href="/about" className="flex items-center">
												<Users className="w-4 h-4 mr-2" />
												ចូលរួមជាស្ម័គ្រចិត្ត
											</a>
										</Button>
										<Button
											variant="outline"
											size="sm"
											asChild
											className="w-full justify-start"
										>
											<a href="/projects" className="flex items-center">
												<Heart className="w-4 h-4 mr-2" />
												ការឧបត្ថម្ភ
											</a>
										</Button>
									</div>
								</Card>

								{/* Map Placeholder */}
								<Card className="p-6">
									<CardHeader className="p-0 mb-4">
										<CardTitle className="text-xl font-bold text-gray-900">
											ទីតាំងរបស់យើង
											<span className="block text-sm text-gray-500 mt-1">
												Our Location
											</span>
										</CardTitle>
									</CardHeader>
									<div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
										<div className="text-center">
											<MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
											<p className="text-gray-500">ផែនទីនឹងបង្ហាញនៅទីនេះ</p>
										</div>
									</div>
								</Card>
							</div>
						</AnimatedSection>
					</div>
				</div>
			</section>
		</div>
	);
}
