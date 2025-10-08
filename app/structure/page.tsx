"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Skeleton } from "@/components/ui/skeleton";

// Services
import { listMembersService } from "@/service/structure/structure-service";
import type { Member, Department } from "@/lib/types/structure";

// Components
import { StructureHero } from "@/components/structure/strucuture-hero";
import { StructureFilterBar } from "@/components/structure/structure-filterbar";
import { DepartmentCard } from "@/components/structure/department-card";

// Icons for departments
import { Users, Award, BookOpen, Heart, Globe, Briefcase } from "lucide-react";

// Loading skeleton
const StructureSkeleton = () => (
	<div className="container section-padding">
		<div className="space-y-8">
			{Array.from({ length: 3 }).map((_, i) => (
				<div key={i} className="space-y-4">
					<Skeleton className="h-32 w-full rounded-lg" />
				</div>
			))}
		</div>
	</div>
);

export default function StructurePage() {
	// State for API data
	const [members, setMembers] = useState<Member[]>([]);
	const [loading, setLoading] = useState(true);

	// UI State
	const [expandedSections, setExpandedSections] = useState<string[]>([
		"executive",
	]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	// Fetch members on mount
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await listMembersService({
					sort: "-joinYear",
					limit: 100,
				});

				if (response.data) {
					setMembers(response.data);
				}
			} catch (error) {
				console.error("Failed to fetch members:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// Group members by department (you'll need to add department field or association)
	// For now, creating a simple grouping structure
	const organizationData = useMemo((): Department[] => {
		// TODO: Replace with actual department categorization from your API
		// This is a placeholder structure
		const departments: Department[] = [
			{
				id: "executive",
				title: "ក្រុមប្រឹក្សាភិបាល",
				title_en: "Executive Board",
				description:
					"Leadership team guiding our mission and strategic direction",
				icon: Users,
				color: "from-blue-500 to-blue-600",
				bgColor: "bg-blue-50",
				members: [],
			},
			{
				id: "education",
				title: "ផ្នែកអប់រំ",
				title_en: "Education Department",
				description:
					"Dedicated to providing quality education and learning opportunities",
				icon: BookOpen,
				color: "from-green-500 to-green-600",
				bgColor: "bg-green-50",
				members: [],
			},
			{
				id: "community",
				title: "ផ្នែកសហគមន៍",
				title_en: "Community Services",
				description:
					"Building stronger communities through outreach and support",
				icon: Heart,
				color: "from-red-500 to-red-600",
				bgColor: "bg-red-50",
				members: [],
			},
		];

		// Distribute members to departments
		// You should categorize based on actual department field from API
		members.forEach((member, index) => {
			const deptIndex = index % departments.length;
			departments[deptIndex].members.push({
				...member,
				department: departments[deptIndex].title_en,
			});
		});

		return departments;
	}, [members]);

	// Filter members based on search and department
	const filteredStructure = useMemo(() => {
		return organizationData
			.map((dept) => ({
				...dept,
				members: dept.members.filter((member) => {
					if (selectedDepartment !== "all" && dept.id !== selectedDepartment) {
						return false;
					}

					if (searchTerm) {
						const search = searchTerm.toLowerCase();
						return (
							member.name_en.toLowerCase().includes(search) ||
							member.position_en.toLowerCase().includes(search) ||
							member.skills.some((skill) =>
								skill.toLowerCase().includes(search)
							) ||
							member.bio.toLowerCase().includes(search)
						);
					}

					return true;
				}),
			}))
			.filter((dept) => dept.members.length > 0);
	}, [organizationData, searchTerm, selectedDepartment]);

	const totalMembers = useMemo(() => members.length, [members]);

	const toggleSection = (sectionId: string) => {
		setExpandedSections((prev) =>
			prev.includes(sectionId)
				? prev.filter((id) => id !== sectionId)
				: [...prev, sectionId]
		);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50">
				<StructureHero departmentCount={0} totalMembers={0} />
				<StructureSkeleton />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<StructureHero
				departmentCount={organizationData.length}
				totalMembers={totalMembers}
			/>

			<StructureFilterBar
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				selectedDepartment={selectedDepartment}
				onDepartmentChange={setSelectedDepartment}
				departments={organizationData}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

			<section className="py-16 md:py-24">
				<div className="container">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900">
							Organization Structure
						</h2>
						<p className="gradient-text text-3xl mt-2">តារាងរចនាសម្ព័ន្ធ</p>
					</AnimatedSection>
					<div className="space-y-8">
						<AnimatePresence>
							{filteredStructure.map((section, index) => (
								<motion.div
									key={section.id}
									initial={{ opacity: 0, y: 50 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<DepartmentCard
										department={section}
										isExpanded={expandedSections.includes(section.id)}
										onToggle={() => toggleSection(section.id)}
										viewMode={viewMode}
									/>
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
								Try adjusting your search terms or filters.
							</p>
						</motion.div>
					)}
				</div>
			</section>
		</div>
	);
}
