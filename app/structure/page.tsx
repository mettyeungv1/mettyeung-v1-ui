"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Users,
	Crown,
	Shield,
	BookOpen,
	Palette,
	ChevronDown,
	Search,
	Filter,
	Grid,
	List,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PersonCard } from "@/components/ui/person-card";
import { usePersonStore, Person } from "@/lib/stores/person-store";
import { useTranslation } from "@/lib/i18n";

// Mock data - in production this would come from an API
const organizationData = [
	{
		id: "executive",
		title: "គណៈកម្មការប្រតិបត្តិ",
		title_en: "Executive Committee",
		icon: Crown,
		color: "from-amber-500 to-orange-500",
		bgColor: "bg-amber-50",
		description: "ក្រុមដឹកនាំគ្រប់គ្រងទូទាំងអង្គការ និងកំណត់ទិសដៅយុទ្ធសាស្ត្រ",
		members: [
			{
				id: "1",
				name: "លោក ម៉ែត ម៉េត្រី",
				name_en: "Mr. Met Metri",
				position: "ប្រធានក្រុម",
				position_en: "Chairman",
				department: "executive",
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
				],
				experience: [
					{
						title: "Community Leader",
						company: "Mettyerng Organization",
						period: "2018 - Present",
						description:
							"Leading community development initiatives and strategic planning for organizational growth.",
					},
				],
				education: [
					{
						degree: "Master in Public Administration",
						institution: "Royal University of Phnom Penh",
						year: "2015",
					},
				],
				socialLinks: [
					{
						platform: "LinkedIn",
						url: "https://linkedin.com",
						icon: "linkedin",
					},
				],
				achievements: [
					"Founded Mettyerng Organization in 2018",
					"Led 25+ successful community projects",
					"Recognized by local government for community service",
				],
				languages: [
					{ language: "Khmer", level: "Native" },
					{ language: "English", level: "Fluent" },
				],
			},
			{
				id: "2",
				name: "អ្នកស្រី ឆាន់ សុខា",
				name_en: "Ms. Chan Sokha",
				position: "អនុប្រធាន",
				position_en: "Vice Chairman",
				department: "executive",
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
				],
				experience: [
					{
						title: "Vice Chairman",
						company: "Mettyerng Organization",
						period: "2019 - Present",
						description:
							"Supporting organizational leadership and managing key projects and initiatives.",
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
				],
				languages: [
					{ language: "Khmer", level: "Native" },
					{ language: "English", level: "Intermediate" },
				],
			},
		],
	},
	{
		id: "advisory",
		title: "គណៈកម្មការប្រឹក្សា",
		title_en: "Advisory Committee",
		icon: Shield,
		color: "from-red-500 to-pink-500",
		bgColor: "bg-red-50",
		description:
			"ផ្តល់ការណែនាំ និងការគាំទ្រយុទ្ធសាស្ត្រ ដើម្បីអភិវឌ្ឍន៍អង្គការ",
		members: [
			{
				id: "3",
				name: "លោក ស៊ុន ពេជ្រ",
				name_en: "Mr. Sun Pech",
				position: "ប្រធានប្រឹក្សា",
				position_en: "Chief Advisor",
				department: "advisory",
				bio: "អតីតមន្ត្រីពាក់ព័ន្ធការអប់រំ មានបទពិសោធន៍ច្រើនជាង 15 ឆ្នាំ",
				email: "advisor@mettyerng.org",
				phone: "+855 12 345 681",
				location: "ភ្នំពេញ",
				joinDate: "2018",
				image:
					"https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?auto=compress&cs=tinysrgb&w=400",
				skills: [
					"Strategic Advisory",
					"Education Policy",
					"Organizational Development",
				],
				experience: [
					{
						title: "Chief Advisor",
						company: "Mettyerng Organization",
						period: "2018 - Present",
						description:
							"Providing strategic guidance and policy recommendations for organizational development.",
					},
				],
				education: [
					{
						degree: "PhD in Education",
						institution: "Chulalongkorn University",
						year: "2005",
					},
				],
				socialLinks: [],
				achievements: [
					"15+ years in education sector",
					"Advised multiple NGOs on strategic development",
				],
				languages: [
					{ language: "Khmer", level: "Native" },
					{ language: "English", level: "Fluent" },
					{ language: "Thai", level: "Intermediate" },
				],
			},
		],
	},
	{
		id: "education",
		title: "ផ្នែកការអប់រំ",
		title_en: "Education Department",
		icon: BookOpen,
		color: "from-blue-500 to-indigo-500",
		bgColor: "bg-blue-50",
		description:
			"ទទួលបន្ទុកគម្រោងអប់រំ និងការបណ្តុះបណ្តាល សម្រាប់កុមារ និងយុវជន",
		members: [
			{
				id: "4",
				name: "អ្នកស្រី គិម សុផល",
				name_en: "Ms. Kim Sophol",
				position: "ប្រធានផ្នែកការអប់រំ",
				position_en: "Education Director",
				department: "education",
				bio: "មានបទពិសោធន៍ 8 ឆ្នាំក្នុងការបង្រៀន និងការអភិវឌ្ឍកម្មវិធីសិក្សា",
				email: "education@mettyerng.org",
				phone: "+855 12 345 683",
				location: "ភ្នំពេញ",
				joinDate: "2020",
				image:
					"https://images.pexels.com/photos/3184343/pexels-photo-3184343.jpeg?auto=compress&cs=tinysrgb&w=400",
				skills: [
					"Curriculum Development",
					"Teaching",
					"Educational Technology",
					"Child Development",
				],
				experience: [
					{
						title: "Education Director",
						company: "Mettyerng Organization",
						period: "2020 - Present",
						description:
							"Leading educational programs and curriculum development for community children.",
					},
				],
				education: [
					{
						degree: "Master in Education",
						institution: "Royal University of Phnom Penh",
						year: "2018",
					},
				],
				socialLinks: [],
				achievements: [
					"Developed curriculum for 200+ children",
					"Improved literacy rates by 60% in target communities",
				],
				languages: [
					{ language: "Khmer", level: "Native" },
					{ language: "English", level: "Fluent" },
				],
			},
		],
	},
	{
		id: "culture",
		title: "ផ្នែកវប្បធម៌",
		title_en: "Culture Department",
		icon: Palette,
		color: "from-green-500 to-emerald-500",
		bgColor: "bg-green-50",
		description: "ទទួលបន្ទុកការអភិរក្ស និងលើកកម្ពស់វប្បធម៌ប្រពៃណីខ្មែរ",
		members: [
			{
				id: "5",
				name: "លោក ខៀវ ផាណា",
				name_en: "Mr. Khiev Phanna",
				position: "ប្រធានផ្នែកវប្បធម៌",
				position_en: "Culture Director",
				department: "culture",
				bio: "ជំនាញខាងរបាំប្រពៃណីខ្មែរ និងតន្ត្រីប្រពៃណី មានបទពិសោធន៍ 10 ឆ្នាំ",
				email: "culture@mettyerng.org",
				phone: "+855 12 345 685",
				location: "សៀមរាប",
				joinDate: "2019",
				image:
					"https://images.pexels.com/photos/3184345/pexels-photo-3184345.jpeg?auto=compress&cs=tinysrgb&w=400",
				skills: [
					"Traditional Dance",
					"Khmer Music",
					"Cultural Preservation",
					"Performance Arts",
				],
				experience: [
					{
						title: "Culture Director",
						company: "Mettyerng Organization",
						period: "2019 - Present",
						description:
							"Preserving and promoting traditional Khmer culture through various programs and events.",
					},
				],
				education: [
					{
						degree: "Bachelor in Fine Arts",
						institution: "Royal University of Fine Arts",
						year: "2015",
					},
				],
				socialLinks: [],
				achievements: [
					"Organized 20+ cultural events",
					"Trained 100+ youth in traditional arts",
				],
				languages: [
					{ language: "Khmer", level: "Native" },
					{ language: "English", level: "Intermediate" },
				],
			},
		],
	},
];

export default function StructurePage() {
	const [expandedSections, setExpandedSections] = useState<string[]>([
		"executive",
	]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const { t } = useTranslation();

	const toggleSection = (sectionId: string) => {
		setExpandedSections((prev) =>
			prev.includes(sectionId)
				? prev.filter((id) => id !== sectionId)
				: [...prev, sectionId]
		);
	};

	const filteredStructure = organizationData.filter((section) => {
		if (selectedDepartment !== "all" && section.id !== selectedDepartment)
			return false;
		if (searchTerm) {
			return (
				section.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
				section.members.some(
					(member) =>
						member.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
						member.position_en
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						member.skills.some((skill) =>
							skill.toLowerCase().includes(searchTerm.toLowerCase())
						)
				)
			);
		}
		return true;
	});

	const totalMembers = organizationData.reduce(
		(total, section) => total + section.members.length,
		0
	);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10 overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5" />
				</div>

				<div className="container relative px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center max-w-5xl mx-auto">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.8 }}
							className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-khmer-gold to-khmer-red rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
						>
							<Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
						</motion.div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
							{t("nav.structure")}
						</h1>

						<p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0">
							{t("about.subtitle")}
						</p>

						{/* Stats */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
							<motion.div
								className="text-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
							>
								<div className="text-2xl sm:text-3xl font-bold text-khmer-gold">
									{organizationData.length}
								</div>
								<div className="text-sm sm:text-base text-gray-600">
									Departments
								</div>
							</motion.div>
							<motion.div
								className="text-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
							>
								<div className="text-2xl sm:text-3xl font-bold text-khmer-red">
									{totalMembers}
								</div>
								<div className="text-sm sm:text-base text-gray-600">
									Members
								</div>
							</motion.div>
							<motion.div
								className="text-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								<div className="text-2xl sm:text-3xl font-bold text-blue-600">
									6
								</div>
								<div className="text-sm sm:text-base text-gray-600">Years</div>
							</motion.div>
							<motion.div
								className="text-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
							>
								<div className="text-2xl sm:text-3xl font-bold text-green-600">
									25+
								</div>
								<div className="text-sm sm:text-base text-gray-600">
									Projects
								</div>
							</motion.div>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* Search and Filter Section */}
			<section className="py-8 sm:py-12 bg-white border-b">
				<div className="container px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
						<div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
								<Input
									placeholder="Search members, positions, or skills..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 h-11"
								/>
							</div>
							<div className="relative min-w-48">
								<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
								<select
									value={selectedDepartment}
									onChange={(e) => setSelectedDepartment(e.target.value)}
									className="pl-10 pr-8 py-2.5 w-full border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-khmer-gold focus:border-transparent h-11"
								>
									<option value="all">All Departments</option>
									{organizationData.map((section) => (
										<option key={section.id} value={section.id}>
											{section.title_en}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Button
								variant={viewMode === "grid" ? "default" : "outline"}
								size="sm"
								onClick={() => setViewMode("grid")}
								className="h-11"
							>
								<Grid className="w-4 h-4" />
							</Button>
							<Button
								variant={viewMode === "list" ? "default" : "outline"}
								size="sm"
								onClick={() => setViewMode("list")}
								className="h-11"
							>
								<List className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Organization Chart */}
			<section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
				<div className="container px-4 sm:px-6 lg:px-8">
					<AnimatedSection className="text-center mb-12 sm:mb-16">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Organization Structure
							<span className="block text-xl sm:text-2xl md:text-3xl gradient-text mt-2">
								តារាងរចនាសម្ព័ន្ធ
							</span>
						</h2>
					</AnimatedSection>

					<div className="space-y-6 sm:space-y-8">
						<AnimatePresence>
							{filteredStructure.map((section, index) => (
								<motion.div
									key={section.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
										<motion.div
											className="cursor-pointer"
											onClick={() => toggleSection(section.id)}
											whileHover={{ scale: 1.01 }}
											whileTap={{ scale: 0.99 }}
										>
											<CardHeader
												className={`${section.bgColor} hover:opacity-80 transition-opacity duration-200`}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center space-x-4 sm:space-x-6">
														<div
															className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center shadow-lg`}
														>
															<section.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
														</div>
														<div>
															<CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
																{section.title_en}
															</CardTitle>
															<p className="text-sm sm:text-base text-gray-600 mt-1">
																{section.title}
															</p>
														</div>
													</div>
													<div className="flex items-center space-x-3">
														<Badge
															variant="secondary"
															className="hidden sm:flex"
														>
															{section.members.length} members
														</Badge>
														<motion.div
															animate={{
																rotate: expandedSections.includes(section.id)
																	? 180
																	: 0,
															}}
															transition={{ duration: 0.3 }}
														>
															<ChevronDown className="w-5 h-5 text-gray-400" />
														</motion.div>
													</div>
												</div>
												<p className="text-gray-700 text-left mt-3 sm:mt-4 leading-relaxed">
													{section.description}
												</p>
											</CardHeader>
										</motion.div>

										<AnimatePresence>
											{expandedSections.includes(section.id) && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.3, ease: "easeInOut" }}
												>
													<CardContent className="p-4 sm:p-6 bg-white">
														<div
															className={`grid gap-4 sm:gap-6 ${
																viewMode === "grid"
																	? "grid-cols-1 lg:grid-cols-2"
																	: "grid-cols-1"
															}`}
														>
															{section.members.map((member, memberIndex) => (
																<PersonCard
																	key={member.id}
																	person={member}
																	variant="detailed"
																	index={memberIndex}
																/>
															))}
														</div>
													</CardContent>
												</motion.div>
											)}
										</AnimatePresence>
									</Card>
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					{filteredStructure.length === 0 && (
						<motion.div
							className="text-center py-12"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Search className="w-8 h-8 text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								No results found
							</h3>
							<p className="text-gray-600">
								Try adjusting your search terms or filters
							</p>
						</motion.div>
					)}
				</div>
			</section>
		</div>
	);
}
