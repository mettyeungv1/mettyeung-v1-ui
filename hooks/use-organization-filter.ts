import { useMemo } from "react";
import { Department } from "@/lib/types/structure";
import { TeamMember } from "@/lib/types";

export function useOrganizationFilter(
	departments: Department[],
	searchTerm: string,
	selectedDepartment: string
) {
	const filteredStructure = useMemo(() => {
		const lowercasedSearchTerm = searchTerm.toLowerCase();

		return departments.filter((section) => {
			// Department filter
			if (selectedDepartment !== "all" && section.id !== selectedDepartment) {
				return false;
			}

			// Search term filter
			if (lowercasedSearchTerm) {
				const isSectionMatch = section.title_en
					.toLowerCase()
					.includes(lowercasedSearchTerm);

				const isMemberMatch = section.members.some(
					(member: any) =>
						member.name_en.toLowerCase().includes(lowercasedSearchTerm) ||
						member.position_en.toLowerCase().includes(lowercasedSearchTerm) ||
						member.skills.some((skill: any) =>
							skill.toLowerCase().includes(lowercasedSearchTerm)
						)
				);

				return isSectionMatch || isMemberMatch;
			}

			return true;
		});
	}, [departments, searchTerm, selectedDepartment]);

	return filteredStructure;
}
