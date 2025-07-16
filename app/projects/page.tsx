"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, Grid, List, SlidersHorizontal } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectFilters } from "@/components/filters/project-filters";
import { useProjectStore, Project } from "@/lib/stores/project-store";
import { useTranslation } from "@/lib/i18n";

// Mock data - in production this would come from an API
const mockProjects: Project[] = [
	{
		id: "1",
		title: "គម្រោងកាត់សក់ដោយឥតគិតថ្លៃ",
		title_en: "Free Haircut Project",
		description: "ការផ្តល់សេវាកាត់សក់ដោយឥតគិតថ្លៃដល់ប្រជាជនដែលមានស្ថានភាពពិបាក",
		longDescription:
			"គម្រោងនេះបានចាប់ផ្តើមឡើងក្នុងឆ្នាំ 2021 ដោយគោលបំណងផ្តល់សេវាកាត់សក់ដោយឥតគិតថ្លៃដល់ប្រជាជនដែលមានស្ថានភាពសេដ្ឋកិច្ចមិនល្អ។ រហូតមកដល់បច្ចុប្បន្ន យើងបានជួយប្រជាជនចំនួន 500 នាក់ហើយ។",
		category: "community",
		status: "ongoing",
		startDate: "2021-01-15",
		location: "ភ្នំពេញ",
		beneficiaries: 500,
		volunteers: 15,
		images: [
			"https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
			"https://images.pexels.com/photos/3993327/pexels-photo-3993327.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		tags: ["Community Service", "Healthcare", "Social Impact"],
		featured: true,
		slug: "free-haircut-project",
	},
	{
		id: "2",
		title: "ការបង្រៀនភាសាខ្មែរដល់កុមារ",
		title_en: "Khmer Language Education for Children",
		description:
			"កម្មវិធីបង្រៀនភាសាខ្មែរ អត្ថន័យ និងលិខិតសម្ភាសន៍ដល់កុមារក្នុងតំបន់ជនបទ",
		longDescription:
			"កម្មវិធីការអប់រំនេះបានចាប់ផ្តើមឡើងក្នុងឆ្នាំ 2019 ដើម្បីបង្រៀនភាសាខ្មែរ ការសរសេរ ការអាន និងវប្បធម៌ប្រពៃណីដល់កុមារដែលមិនមានឱកាសទៅសាលារៀន។",
		category: "education",
		status: "ongoing",
		startDate: "2019-03-01",
		location: "ខេត្តកន្ទាល",
		beneficiaries: 200,
		volunteers: 8,
		images: [
			"https://images.pexels.com/photos/5427652/pexels-photo-5427652.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		tags: ["Education", "Language", "Children", "Rural Development"],
		featured: true,
		slug: "khmer-language-education",
	},
	{
		id: "3",
		title: "ការអភិរក្សវប្បធម៌ប្រពៃណីខ្មែរ",
		title_en: "Traditional Khmer Culture Preservation",
		description:
			"ការរៀបចំកម្មវិធីរបាំ តន្ត្រី និងពិធីបុណ្យប្រពៃណីដើម្បីអភិរក្សវប្បធម៌",
		longDescription:
			"គម្រោងនេះផ្តោតលើការអភិរក្សវប្បធម៌ប្រពៃណីខ្មែរតាមរយៈការរៀបចំកម្មវិធីរបាំ តន្ត្រី ការប្រកួតប្រកាន់ និងការបណ្តុះបណ្តាលយុវជនអំពីតម្លៃវប្បធម៌។",
		category: "culture",
		status: "ongoing",
		startDate: "2020-06-01",
		location: "ទូទាំងប្រទេស",
		beneficiaries: 300,
		volunteers: 12,
		images: [
			"https://images.pexels.com/photos/8369686/pexels-photo-8369686.jpeg?auto=compress&cs=tinysrgb&w=800",
		],
		tags: ["Culture", "Traditional Arts", "Youth Development", "Heritage"],
		featured: false,
		slug: "culture-preservation",
	},
	// {
	// 	id: "4",
	// 	title: "ការបរិច្ចាគអាហារ និងសម្ភារៈ",
	// 	title_en: "Food and Supplies Donation",
	// 	description:
	// 		"ការបរិច្ចាគអាហារ សម្ភារៈចាំបាច់ដល់គ្រួសារក្រីក្រ និងក្នុងស្ថានការណ៍បន្ទាន់",
	// 	longDescription:
	// 		"កម្មវិធីនេះរៀបចំឡើងជាអចិន្ត្រៃយ៍ ជាពិសេសក្នុងរដូវកង្វះ ឬស្ថានការណ៍បន្ទាន់ ដើម្បីជួយដល់គ្រួសារដែលមានស្ថានភាពសេដ្ឋកិច្ចពិបាក។",
	// 	category: "community",
	// 	status: "ongoing",
	// 	startDate: "2020-03-15",
	// 	location: "ភ្នំពេញ និងជនបទ",
	// 	beneficiaries: 150,
	// 	volunteers: 20,
	// 	images: [
	// 		"https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
	// 	],
	// 	tags: ["Food Security", "Emergency Relief", "Community Support"],
	// 	featured: false,
	// 	slug: "food-donation",
	// },
	// {
	// 	id: "5",
	// 	title: "ការបណ្តុះបណ្តាលជំនាញយុវជន",
	// 	title_en: "Youth Skills Development",
	// 	description: "កម្មវិធីបណ្តុះបណ្តាលជំនាញបច្ចេកទេសដល់យុវជនក្នុងសហគមន៍",
	// 	longDescription:
	// 		"ការបណ្តុះបណ្តាលជំនាញគឺជាការវិនិយោគសម្រាប់អនាគត។ យើងផ្តល់ការបណ្តុះបណ្តាលជំនាញផ្សេងៗដល់យុវជន។",
	// 	category: "education",
	// 	status: "completed",
	// 	startDate: "2023-01-10",
	// 	endDate: "2023-12-15",
	// 	location: "ភ្នំពេញ",
	// 	beneficiaries: 80,
	// 	volunteers: 6,
	// 	images: [
	// 		"https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=800",
	// 	],
	// 	tags: ["Skills Training", "Youth", "Employment", "Technology"],
	// 	featured: false,
	// 	slug: "youth-skills-development",
	// },
	// {
	// 	id: "6",
	// 	title: "ការប្រកួតកីឡាក្នុងសហគមន៍",
	// 	title_en: "Community Sports Tournament",
	// 	description: "ការរៀបចំការប្រកួតកីឡាតុក្កតា និងបាល់បោះ ដើម្បីកសាងសាមគ្គីភាព",
	// 	longDescription:
	// 		"កីឡាគឺជាមធ្យោបាយដ៏ល្អមួយក្នុងការកសាងសាមគ្គីភាព និងការអភិវឌ្ឍសុខភាពរាងកាយ។",
	// 	category: "sports",
	// 	status: "completed",
	// 	startDate: "2023-11-01",
	// 	endDate: "2023-11-30",
	// 	location: "ភ្នំពេញ",
	// 	beneficiaries: 120,
	// 	volunteers: 10,
	// 	images: [
	// 		"https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=800",
	// 	],
	// 	tags: ["Sports", "Community Building", "Health", "Youth"],
	// 	featured: false,
	// 	slug: "community-sports-tournament",
	// },
];

const projectStats = [
	{
		title: "Total Projects",
		value: 25,
		suffix: "+",
		icon: Target,
		description: "Completed and ongoing projects",
	},
	{
		title: "Beneficiaries",
		value: 1350,
		suffix: "+",
		icon: Target,
		description: "People directly helped",
	},
	{
		title: "Active Volunteers",
		value: 71,
		suffix: "",
		icon: Target,
		description: "Dedicated team members",
	},
	{
		title: "Communities",
		value: 8,
		suffix: "",
		icon: Target,
		description: "Areas we serve",
	},
];

export default function ProjectsPage() {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [showFilters, setShowFilters] = useState(false);
	const { t } = useTranslation();

	const { setProjects, getFilteredProjects, getProjectCategories } =
		useProjectStore();

	// Initialize projects data
	useEffect(() => {
		setProjects(mockProjects);
	}, [setProjects]);

	const filteredProjects = getFilteredProjects();
	const categories = getProjectCategories();

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
							<Target className="w-10 h-10 text-white" />
						</motion.div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
							{t("projects.title")}
						</h1>

						<p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
							{t("projects.subtitle")}
						</p>
					</AnimatedSection>
				</div>
			</section>

			{/* Stats Section */}
			<section className="section-padding bg-white">
				<div className="container">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							{t("projects.impact")}
						</h2>
					</AnimatedSection>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{projectStats.map((stat, index) => (
							<MetricCard key={stat.title} {...stat} delay={index * 0.1} />
						))}
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section className="section-padding bg-gray-50">
				<div className="container">
					<div className="flex flex-col lg:flex-row gap-8">
						{/* Sidebar Filters */}
						<div className="lg:w-80">
							<div className="sticky top-24">
								<div className="flex items-center justify-between mb-6 lg:hidden">
									<h3 className="text-lg font-semibold">Filters</h3>
									<Button
										variant="outline"
										size="sm"
										onClick={() => setShowFilters(!showFilters)}
									>
										<SlidersHorizontal className="w-4 h-4 mr-2" />
										{showFilters ? "Hide" : "Show"} Filters
									</Button>
								</div>

								<div className={`${showFilters ? "block" : "hidden"} lg:block`}>
									<ProjectFilters />
								</div>
							</div>
						</div>

						{/* Main Content */}
						<div className="flex-1">
							{/* Header */}
							<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
								<div>
									<h2 className="text-2xl font-bold text-gray-900 mb-2">
										All Projects
									</h2>
									<p className="text-gray-600">
										Showing {filteredProjects.length} of {mockProjects.length}{" "}
										projects
									</p>
								</div>

								<div className="flex items-center space-x-2 mt-4 sm:mt-0">
									<Button
										variant={viewMode === "grid" ? "default" : "outline"}
										size="sm"
										onClick={() => setViewMode("grid")}
									>
										<Grid className="w-4 h-4" />
									</Button>
									<Button
										variant={viewMode === "list" ? "default" : "outline"}
										size="sm"
										onClick={() => setViewMode("list")}
									>
										<List className="w-4 h-4" />
									</Button>
								</div>
							</div>

							{/* Projects Grid/List */}
							{/* <div
								className={`grid gap-6 ${
									viewMode === "grid"
										? "grid-cols-1 md:grid-cols-2"
										: "grid-cols-1"
								}`}
							>
								{filteredProjects.map((project, index) => (
									<ProjectCard
										key={project.id}
										project={project}
										index={index}
									/>
								))}
							</div> */}

							{/* No Results */}
							{filteredProjects.length === 0 && (
								<motion.div
									className="text-center py-16"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
										<Target className="w-8 h-8 text-gray-400" />
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-2">
										No projects found
									</h3>
									<p className="text-gray-600 mb-6">
										Try adjusting your filters to see more results
									</p>
									<Button
										variant="outline"
										onClick={() => useProjectStore.getState().resetFilters()}
									>
										Clear all filters
									</Button>
								</motion.div>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
