"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useTranslation } from "@/lib/i18n";

// Data and Logic
import { organizationData } from "@/lib/data/structure";
import { useOrganizationFilter } from "@/hooks/use-organization-filter";

// Reusable Components
import { StructureHero } from "@/components/structure/strucuture-hero";
import { StructureFilterBar } from "@/components/structure/structure-filterbar";
import { DepartmentCard } from "@/components/structure/department-card";

export default function StructurePage() {
	const [expandedSections, setExpandedSections] = useState<string[]>([
		"executive",
	]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const filteredStructure = useOrganizationFilter(
		organizationData,
		searchTerm,
		selectedDepartment
	);

	const totalMembers = useMemo(
		() =>
			organizationData.reduce(
				(total, section) => total + section.members.length,
				0
			),
		[] // This only needs to compute once
	);

	const toggleSection = (sectionId: string) => {
		setExpandedSections((prev) =>
			prev.includes(sectionId)
				? prev.filter((id) => id !== sectionId)
				: [...prev, sectionId]
		);
	};

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
