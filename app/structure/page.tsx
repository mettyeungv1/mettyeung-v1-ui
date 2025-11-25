"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Search, Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Skeleton } from "@/components/ui/skeleton";

// Services
import {
	getAssociationService,
	listMembersService,
} from "@/service/structure/structure-service";
import type { Member, Department } from "@/lib/types/structure";

// Components
import { StructureHero } from "@/components/structure/strucuture-hero";
import { StructureFilterBar } from "@/components/structure/structure-filterbar";
import { DepartmentCard } from "@/components/structure/department-card";

// Icons for departments
import { Users, Award, BookOpen, Heart, Globe, Briefcase } from "lucide-react";
import { associationData } from "@/lib/data/association";
import { useTranslation } from "@/lib/i18n";

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
	const { t } = useTranslation();
	const departmentStylingMap: Record<
		string,
		{
			icon: React.ElementType;
			color: string;
			bgColor: string;
			image: string;
			title: string;
		}
	> = {
		"Honorary Member": {
			icon: Award,
			color: "from-purple-500 to-purple-600",
			bgColor: "bg-purple-50",
			image: "/Honorary Member.png",
			title: t("structure.honorMember"),
		},
		"Our Friends Association Executive Committee": {
			icon: Briefcase,
			color: "from-green-500 to-green-600",
			bgColor: "bg-green-50",
			image: "/Our Friends Association Executive Committee.jpg",
			title: t("structure.executiveCommittee"),
		},
		"Our Friends Association Board of Directors": {
			icon: Users,
			color: "from-blue-500 to-blue-600",
			bgColor: "bg-blue-50",
			image: "/Our Friends Association Board of Directors.jpg",
			title: t("structure.boardOfDirectors"),
		},
		"Senior Advisor of Our Friends Association": {
			icon: Star,
			color: "from-amber-500 to-amber-600",
			bgColor: "bg-amber-50",
			image: "/Senior Advisor of Our Friends Association.jpg",
			title: t("structure.seniorAdvisors"),
		},
		"Association Branch": {
			icon: Heart,
			color: "from-red-500 to-red-600",
			bgColor: "bg-red-50",
			image: "/Association Branch.png",
			title: t("structure.associationBranches"),
		},
		"Board Director": {
			icon: Users,
			color: "from-sky-500 to-sky-600",
			bgColor: "bg-sky-50",
			image: "",
			title: "Board Director",
		},
	};
	// State for API data
	const [allMembers, setAllMembers] = useState<any[]>([]);
	const [allAssociations, setAllAssociations] = useState<Member[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// State for UI filters and interactions
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("all");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [expandedSections, setExpandedSections] = useState<any>([]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const [membersRes, associationsRes] = await Promise.all([
					listMembersService(),
					getAssociationService(),
				]);

				if (Array.isArray(membersRes.data)) {
					setAllMembers(membersRes.data);
				} else {
					throw new Error("Failed to fetch members.");
				}
				if (associationsRes?.data) {
					setAllAssociations(associationsRes.data);
				}
			} catch (err) {
				setError("Could not load organization data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const organizationData = useMemo((): Department[] => {
		const defaultStyle = {
			icon: Folder,
			color: "from-gray-500 to-gray-600",
			bgColor: "bg-gray-50",
		};

		// 2. Map over the associations fetched from the API

		let finalDepartments = (allAssociations || []).map((assoc: any) => {
			const membersOfAssociation = Array.isArray(assoc.associationMembers)
				? assoc.associationMembers.map((m: any) => m.member)
				: [];

			const style = departmentStylingMap[assoc.name] || defaultStyle;

			return {
				id: assoc.id,
				title_en: assoc.name,
				title: style.title,
				members: membersOfAssociation?.map((m: any) => ({
					...m,
					department: assoc.name,
				})),
				icon: style.icon,
				color: style.color,
				bgColor: style.bgColor,
				image: style.image,
			};
		});

		if (selectedDepartment !== "all") {
			finalDepartments = finalDepartments.filter(
				(d) => d.id === selectedDepartment
			);
		}

		if (searchTerm) {
			const lowercasedQuery = searchTerm.toLowerCase();
			finalDepartments = finalDepartments
				.map((dept) => ({
					...dept,
					members: dept.members.filter(
						(member: any) =>
							member.name.toLowerCase().includes(lowercasedQuery) ||
							(member.title_en || "").toLowerCase().includes(lowercasedQuery)
					),
				}))
				.filter((dept) => dept.members.length > 0); // Only show departments with matching members
		}

		return finalDepartments as any;
	}, [allMembers, allAssociations, searchTerm, selectedDepartment, t]);

	const filteredStructure = useMemo(() => {
		// return organizationData.filter((dept) => dept?.members?.length > 0);
		return organizationData;
	}, [organizationData, searchTerm, selectedDepartment]);

	const totalMembers = useMemo(() => allMembers.length, [allMembers]);

	const toggleSection = (sectionId: string) => {
		setExpandedSections((prev: any) =>
			prev.includes(sectionId)
				? prev.filter((id: any) => id !== sectionId)
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
							{t("structure.chart")}
						</h2>
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
										isExpanded={expandedSections?.includes(section.id)}
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
