"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

import type { Member, Department } from "@/lib/types/structure";

// Components
import { StructureHero } from "@/components/structure/structure-hero";
import { DepartmentSection } from "@/components/structure/department-section";
import { normalizeMemberData } from "@/service/structure/structure-service";

// Icons for departments
import { Users, Award, BookOpen, Heart, Briefcase, Star, Building2, Flame, Feather } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface StructurePageClientProps {
	initialMembers: any[];
	initialAssociations: Member[];
}

export function StructurePageClient({
	initialMembers,
	initialAssociations,
}: StructurePageClientProps) {
	const { t } = useTranslation();

	const dynamicThemes = [
		{ icon: Building2, color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50" },
		{ icon: Briefcase, color: "from-green-500 to-green-600", bgColor: "bg-green-50" },
		{ icon: Users, color: "from-violet-500 to-violet-600", bgColor: "bg-violet-50" },
		{ icon: Star, color: "from-amber-500 to-amber-600", bgColor: "bg-amber-50" },
		{ icon: Award, color: "from-rose-500 to-rose-600", bgColor: "bg-rose-50" },
		{ icon: Heart, color: "from-pink-500 to-pink-600", bgColor: "bg-pink-50" },
		{ icon: BookOpen, color: "from-sky-500 to-sky-600", bgColor: "bg-sky-50" },
		{ icon: Flame, color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50" },
		{ icon: Feather, color: "from-teal-500 to-teal-600", bgColor: "bg-teal-50" },
	];

	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const members = initialMembers;
	const associations = initialAssociations;

	// Build full organization data (unfiltered) for department list
	const allOrganizationData = useMemo((): Department[] => {
		return [...(associations || [])]
			.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
			.map((assoc: any, index: number) => {
				const membersOfAssociation = Array.isArray(assoc.associationMembers)
					? assoc.associationMembers.map((m: any) => {
							const mappedMember = normalizeMemberData({
								...m.member,
								role: m.role,
								department: assoc.name,
							});
							return { ...mappedMember, originalId: m.member.id, id: m.member.id };
					  })
					: [];

				const theme = dynamicThemes[Math.abs(index) % dynamicThemes.length];

				return {
					id: assoc.id,
					title_en: t(assoc.name) || assoc.name?.en || "",
					title: t(assoc.name) || assoc.name?.en || "",
					description: t(assoc.description) || assoc.description?.en || "",
					members: membersOfAssociation,
					icon: theme.icon,
					color: theme.color,
					bgColor: theme.bgColor,
					image: assoc.image_url || "",
				};
			}) as any;
	}, [members, associations, t]);

	const totalMembers = useMemo(() => members.length, [members]);

	return (
		<div className="min-h-screen bg-gray-50">
			<StructureHero
				departmentCount={allOrganizationData.length}
				totalMembers={totalMembers}
			/>

			<section className="py-16 md:py-24">
				<div className="container">
					<AnimatedSection className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900">
							{t("structure.chart")}
						</h2>
					</AnimatedSection>
					<div className="space-y-16">
							{allOrganizationData.map((section, index) => (
								<div
									key={section.id}
									className="structure-department-enter"
									style={{ animationDelay: `${Math.min(index * 80, 480)}ms` }}
								>
									<DepartmentSection
										department={section}
										viewMode={viewMode}
									/>
								</div>
							))}
					</div>

					{allOrganizationData.length === 0 && (
						<div className="text-center py-16">
							<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Search className="w-8 h-8 text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								{t("structure.noMembersFound")}
							</h3>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
