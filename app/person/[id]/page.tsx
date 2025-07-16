"use client";

import React from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Award,
	BookOpen,
	Globe,
	ExternalLink,
	Star,
	Building,
	Users,
	Heart,
} from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data - in production this would come from an API
const mockPersonData = [
	{
		id: "1",
		name: "លោក ម៉ែត ម៉េត្រី",
		name_en: "Mr. Met Metri",
		position: "ប្រធានក្រុម",
		position_en: "Chairman",
		department: "executive",
		department_name: "Executive Committee",
		bio: "មានបទពិសោធន៍ជាង 10 ឆ្នាំក្នុងការដឹកនាំអង្គការសង្គម និងការអភិវឌ្ឍន៍សហគមន៍",
		email: "chairman@mettyerng.org",
		phone: "+855 12 345 678",
		location: "ភ្នំពេញ",
		joinDate: "2018",
		image:
			"https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
		skills: [
			"Leadership",
			"Strategic Planning",
			"Community Development",
			"Public Speaking",
			"Project Management",
			"Team Building",
		],
		experience: [
			{
				title: "Chairman",
				company: "Mettyerng Organization",
				period: "2018 - Present",
				description:
					"Leading community development initiatives and strategic planning for organizational growth. Overseeing all major projects and ensuring alignment with organizational mission and values.",
			},
			{
				title: "Community Development Coordinator",
				company: "Local NGO Partnership",
				period: "2015 - 2018",
				description:
					"Coordinated community outreach programs and managed relationships with local stakeholders. Successfully implemented 15+ community development projects.",
			},
			{
				title: "Project Manager",
				company: "Social Impact Initiative",
				period: "2012 - 2015",
				description:
					"Managed multiple social impact projects focusing on education and healthcare in rural communities. Led teams of 20+ volunteers and staff members.",
			},
		],
		education: [
			{
				degree: "Master in Public Administration",
				institution: "Royal University of Phnom Penh",
				year: "2015",
			},
			{
				degree: "Bachelor in Social Work",
				institution: "University of Cambodia",
				year: "2012",
			},
		],
		socialLinks: [
			{ platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
			{ platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
		],
		achievements: [
			"Founded Mettyerng Organization in 2018",
			"Led 25+ successful community projects",
			"Recognized by local government for community service",
			"Awarded 'Community Leader of the Year' in 2022",
			"Successfully raised $50,000+ for community projects",
			"Mentored 100+ young volunteers",
		],
		languages: [
			{ language: "Khmer", level: "Native" },
			{ language: "English", level: "Fluent" },
			{ language: "French", level: "Intermediate" },
		],
		projects: [
			"Free Haircut Project",
			"Khmer Language Education",
			"Community Sports Tournament",
			"Food Donation Program",
		],
		testimonials: [
			{
				text: "Met Metri's leadership has transformed our community. His dedication and vision inspire everyone around him.",
				author: "Community Member",
				role: "Local Resident",
			},
			{
				text: "Working under his guidance has been an incredible learning experience. He truly cares about making a difference.",
				author: "Team Member",
				role: "Volunteer Coordinator",
			},
		],
	},
	{
		id: "2",
		name: "អ្នកស្រី ឆាន់ សុខា",
		name_en: "Ms. Chan Sokha",
		position: "អនុប្រធាន",
		position_en: "Vice Chairman",
		department: "executive",
		department_name: "Executive Committee",
		bio: "ជំនាញខាងការរៀបចំ និងការសម្របសម្រួលកម្មវិធី មានបទពិសោធន៍ 8 ឆ្នាំ",
		email: "vicechairman@mettyerng.org",
		phone: "+855 12 345 679",
		location: "ភ្នំពេញ",
		joinDate: "2019",
		image:
			"https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
		skills: [
			"Project Management",
			"Event Planning",
			"Team Coordination",
			"Communication",
			"Budget Management",
		],
		experience: [
			{
				title: "Vice Chairman",
				company: "Mettyerng Organization",
				period: "2019 - Present",
				description:
					"Supporting organizational leadership and managing key projects and initiatives. Coordinating between different departments and ensuring smooth operations.",
			},
		],
		education: [
			{
				degree: "Bachelor in Business Administration",
				institution: "University of Cambodia",
				year: "2017",
			},
		],
		socialLinks: [],
		achievements: [
			"Successfully coordinated 15+ major events",
			"Improved organizational efficiency by 40%",
			"Led digital transformation initiatives",
		],
		languages: [
			{ language: "Khmer", level: "Native" },
			{ language: "English", level: "Intermediate" },
		],
		projects: ["Community Events Coordination", "Volunteer Training Program"],
		testimonials: [],
	},
];

interface PersonDetailPageProps {
	params: {
		id: string;
	};
}

export default function PersonDetailPage({ params }: PersonDetailPageProps) {
	const person = mockPersonData.find((p) => p.id === params.id);

	if (!person) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="relative py-16 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
				<div className="container">
					<AnimatedSection>
						<div className="mb-6">
							<Button
								variant="ghost"
								asChild
								className="text-gray-600 hover:text-khmer-gold"
							>
								<Link href="/structure" className="flex items-center">
									<ArrowLeft className="w-4 h-4 mr-2" />
									Back to Organization Structure
								</Link>
							</Button>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
							{/* Profile Card */}
							<div className="lg:col-span-1">
								<Card className="sticky top-24">
									<CardContent className="p-8 text-center">
										<Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-khmer-gold/20">
											<AvatarImage src={person.image} alt={person.name} />
											<AvatarFallback className="bg-gradient-to-br from-khmer-gold to-khmer-red text-white text-3xl font-bold">
												{person.name_en
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>

										<h1 className="text-2xl font-bold text-gray-900 mb-2">
											{person.name_en}
										</h1>
										<p className="text-lg text-gray-600 mb-3">{person.name}</p>

										<Badge className="bg-khmer-gold text-white mb-4">
											{person.position_en}
										</Badge>

										<div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
											<Building className="w-4 h-4" />
											<span>{person.department_name}</span>
										</div>

										<p className="text-gray-600 leading-relaxed mb-6">
											{person.bio}
										</p>

										{/* Contact Info */}
										<div className="space-y-3 text-left">
											<div className="flex items-center space-x-3">
												<Mail className="w-4 h-4 text-gray-400" />
												<a
													href={`mailto:${person.email}`}
													className="text-gray-600 hover:text-khmer-gold transition-colors text-sm"
												>
													{person.email}
												</a>
											</div>

											<div className="flex items-center space-x-3">
												<Phone className="w-4 h-4 text-gray-400" />
												<a
													href={`tel:${person.phone}`}
													className="text-gray-600 hover:text-khmer-gold transition-colors text-sm"
												>
													{person.phone}
												</a>
											</div>

											<div className="flex items-center space-x-3">
												<MapPin className="w-4 h-4 text-gray-400" />
												<span className="text-gray-600 text-sm">
													{person.location}
												</span>
											</div>

											<div className="flex items-center space-x-3">
												<Calendar className="w-4 h-4 text-gray-400" />
												<span className="text-gray-600 text-sm">
													Joined {person.joinDate}
												</span>
											</div>
										</div>

										{/* Social Links */}
										{person.socialLinks.length > 0 && (
											<div className="mt-6 pt-6 border-t border-gray-200">
												<div className="flex justify-center space-x-3">
													{person.socialLinks.map((social, index) => (
														<Button
															key={index}
															variant="outline"
															size="sm"
															asChild
															className="hover:bg-khmer-gold hover:text-white hover:border-khmer-gold"
														>
															<a
																href={social.url}
																target="_blank"
																rel="noopener noreferrer"
																className="flex items-center space-x-2"
															>
																<ExternalLink className="w-4 h-4" />
																<span>{social.platform}</span>
															</a>
														</Button>
													))}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							</div>

							{/* Main Content */}
							<div className="lg:col-span-2 space-y-8">
								{/* Skills */}
								<AnimatedSection>
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center space-x-2">
												<Star className="w-5 h-5 text-khmer-gold" />
												<span>Skills & Expertise</span>
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="flex flex-wrap gap-3">
												{person.skills.map((skill, index) => (
													<Badge
														key={index}
														variant="secondary"
														className="bg-khmer-gold/10 text-khmer-gold border-khmer-gold/20"
													>
														{skill}
													</Badge>
												))}
											</div>
										</CardContent>
									</Card>
								</AnimatedSection>

								{/* Experience */}
								<AnimatedSection delay={0.1}>
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center space-x-2">
												<Award className="w-5 h-5 text-khmer-gold" />
												<span>Professional Experience</span>
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="space-y-6">
												{person.experience.map((exp, index) => (
													<div key={index} className="relative">
														{index > 0 && <Separator className="mb-6" />}
														<div className="space-y-3">
															<div className="flex items-start justify-between">
																<div>
																	<h4 className="font-semibold text-lg text-gray-900">
																		{exp.title}
																	</h4>
																	<p className="text-khmer-gold font-medium">
																		{exp.company}
																	</p>
																</div>
																<Badge variant="outline" className="text-sm">
																	{exp.period}
																</Badge>
															</div>
															<p className="text-gray-600 leading-relaxed">
																{exp.description}
															</p>
														</div>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</AnimatedSection>

								{/* Education */}
								<AnimatedSection delay={0.2}>
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center space-x-2">
												<BookOpen className="w-5 h-5 text-khmer-gold" />
												<span>Education</span>
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												{person.education.map((edu, index) => (
													<div
														key={index}
														className="flex items-start space-x-4"
													>
														<div className="w-3 h-3 bg-khmer-gold rounded-full mt-2 flex-shrink-0" />
														<div>
															<h4 className="font-semibold text-gray-900">
																{edu.degree}
															</h4>
															<p className="text-khmer-gold font-medium">
																{edu.institution}
															</p>
															<p className="text-sm text-gray-500">
																{edu.year}
															</p>
														</div>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</AnimatedSection>

								{/* Languages */}
								<AnimatedSection delay={0.3}>
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center space-x-2">
												<Globe className="w-5 h-5 text-khmer-gold" />
												<span>Languages</span>
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												{person.languages.map((lang, index) => (
													<div
														key={index}
														className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
													>
														<span className="font-medium text-gray-900">
															{lang.language}
														</span>
														<Badge
															variant="outline"
															className="text-khmer-gold border-khmer-gold"
														>
															{lang.level}
														</Badge>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</AnimatedSection>

								{/* Achievements */}
								<AnimatedSection delay={0.4}>
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center space-x-2">
												<Award className="w-5 h-5 text-khmer-gold" />
												<span>Key Achievements</span>
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												{person.achievements.map((achievement, index) => (
													<div
														key={index}
														className="flex items-start space-x-3 p-3 bg-gradient-to-r from-khmer-gold/5 to-khmer-red/5 rounded-lg"
													>
														<div className="w-2 h-2 bg-khmer-gold rounded-full mt-2 flex-shrink-0" />
														<span className="text-gray-600 text-sm leading-relaxed">
															{achievement}
														</span>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</AnimatedSection>

								{/* Projects */}
								{person.projects.length > 0 && (
									<AnimatedSection delay={0.5}>
										<Card>
											<CardHeader>
												<CardTitle className="flex items-center space-x-2">
													<Users className="w-5 h-5 text-khmer-gold" />
													<span>Projects Involved</span>
												</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="flex flex-wrap gap-2">
													{person.projects.map((project, index) => (
														<Badge
															key={index}
															variant="outline"
															className="text-gray-700 border-gray-300"
														>
															{project}
														</Badge>
													))}
												</div>
											</CardContent>
										</Card>
									</AnimatedSection>
								)}

								{/* Testimonials */}
								{person.testimonials.length > 0 && (
									<AnimatedSection delay={0.6}>
										<Card>
											<CardHeader>
												<CardTitle className="flex items-center space-x-2">
													<Heart className="w-5 h-5 text-khmer-gold" />
													<span>What Others Say</span>
												</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="space-y-6">
													{person.testimonials.map((testimonial, index) => (
														<div
															key={index}
															className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
														>
															<div className="absolute top-4 left-4 text-4xl text-khmer-gold/20"></div>
															<p className="text-gray-700 italic leading-relaxed mb-4 pl-8">
																{testimonial.text}
															</p>
															<div className="flex items-center space-x-3 pl-8">
																<div>
																	<p className="font-medium text-gray-900">
																		{testimonial.author}
																	</p>
																	<p className="text-sm text-gray-500">
																		{testimonial.role}
																	</p>
																</div>
															</div>
														</div>
													))}
												</div>
											</CardContent>
										</Card>
									</AnimatedSection>
								)}

								{/* Call to Action */}
								<AnimatedSection delay={0.7}>
									<Card className="bg-gradient-to-br from-khmer-gold/10 to-khmer-red/10 border-khmer-gold/20">
										<CardContent className="p-8 text-center">
											<h3 className="text-xl font-bold text-gray-900 mb-4">
												Interested in Joining Our Team?
											</h3>
											<p className="text-gray-600 mb-6">
												Were always looking for passionate individuals to join
												our mission of community development.
											</p>
											<div className="flex flex-col sm:flex-row gap-4 justify-center">
												<Button
													className="bg-gradient-to-r from-khmer-gold to-khmer-red"
													asChild
												>
													<Link href="/contact">
														<Heart className="w-4 h-4 mr-2" />
														Join Our Team
													</Link>
												</Button>
												<Button variant="outline" asChild>
													<Link href="/structure">
														<Users className="w-4 h-4 mr-2" />
														View All Members
													</Link>
												</Button>
											</div>
										</CardContent>
									</Card>
								</AnimatedSection>
							</div>
						</div>
					</AnimatedSection>
				</div>
			</section>
		</div>
	);
}
