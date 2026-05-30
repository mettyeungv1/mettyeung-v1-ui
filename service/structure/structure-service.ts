import { fetchAPI } from "@/lib/api";
import { STRUCTURE_ENDPOINT, MEDIA_ENDPOINT } from "@/lib/static";
import type { Member, APIMemberResponse } from "@/lib/types/structure";
import { DEFAULT_LANGUAGE_CODE } from "@/lib/types/languages";

/**
 * Normalizes a raw member from the API into a clean, consistent Member type for the frontend.
 */
export function normalizeMemberData(member: any): Member {
	const name_en = member.name || "Unknown Member";
	const title_en = member.title?.[DEFAULT_LANGUAGE_CODE] || "Member";
	const position_en = member.title?.[DEFAULT_LANGUAGE_CODE] || "Member";
	const location_en = member.location?.[DEFAULT_LANGUAGE_CODE] || "";

	// Join date — preserve full date, fallback to year-only
	const joinDate = member.join_date
		? new Date(member.join_date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})
		: member.joinYear
			? member.joinYear.toString()
			: "";

	// API returns associationMembers, memberSkills, personalEducations, personalExperiences
	// We need to handle both naming conventions (raw API vs already-mapped)
	const rawAssociations = member.associationMembers || member.associations || [];
	const rawSkills = member.memberSkills || member.skills || [];
	const rawEducations = member.personalEducations || member.educations || [];
	const rawExperiences = member.personalExperiences || member.experiences || [];
	const rawSocials = member.socials || member.memberSocials || [];
	const rawLanguages = member.memberLanguages || member.languages || [];

	// Normalize associations to a consistent shape
	const associations = rawAssociations.map((assoc: any) => ({
		associationId: assoc.associationId || assoc.association_id || "",
		name: assoc.name || assoc.association?.name || "Department",
		role: assoc.role || "",
		isHead: assoc.isHead ?? assoc.is_head ?? false,
		order: assoc.order ?? 0,
	}));

	// Normalize skills — extract skillName for display
	const skills = rawSkills.map((s: any) => s.skillName || s.skill?.name || s.skillId || s.skill_id || "");

	// Normalize educations — convert snake_case to camelCase
	const educations = rawEducations.map((edu: any) => ({
		schoolName: edu.schoolName || (edu.school_name ? { en: edu.school_name } : { en: "" }),
		degree: typeof edu.degree === "object" ? edu.degree : { en: edu.degree || "" },
		startYear: edu.startYear ?? edu.start_year ?? undefined,
		endYear: edu.endYear ?? edu.end_year ?? undefined,
		order: edu.order ?? 1,
	}));

	// Normalize experiences — convert snake_case to camelCase
	const experiences = rawExperiences.map((exp: any) => ({
		title: typeof exp.title === "object" ? exp.title : { en: exp.title || "" },
		organization: typeof exp.organization === "object" ? exp.organization : { en: exp.organization || "" },
		description: typeof exp.description === "object" ? exp.description : { en: exp.description || "" },
		startYear: exp.startYear ?? exp.start_year ?? undefined,
		endYear: exp.endYear ?? exp.end_year ?? undefined,
		order: exp.order ?? 1,
	}));

	// Normalize languages
	const languages = rawLanguages.map((lang: any) =>
		lang.name || lang.language?.name || lang.languageName || ""
	).filter(Boolean);

	// Capitalize nationality
	const nationality = member.nationality
		? member.nationality.charAt(0).toUpperCase() + member.nationality.slice(1).toLowerCase()
		: undefined;

	return {
		id: member.id,
		name: member.name,
		name_en,
		title_en,
		position_en,
		image: (() => {
			const raw = member.avatarUrl || member.avatar_url;
			if (!raw) return "/placeholder.svg";
			if (raw.startsWith("http")) return raw;
			return `${MEDIA_ENDPOINT}/view/${raw}`;
		})(),
		email: member.email || "",
		phone: member.phoneNumber || member.phone_number || "",
		phoneNumber: member.phoneNumber || member.phone_number || "",
		location: location_en,
		location_en,
		joinDate,
		joinYear: member.joinYear || member.join_year || (member.join_date ? new Date(member.join_date).getFullYear() : undefined),
		bio: member.bio?.[DEFAULT_LANGUAGE_CODE] || (typeof member.bio === 'string' ? member.bio : ""),
		department: associations.length > 0 ? associations[0].name : "",
		skills,
		socials: rawSocials,
		socialLinks: rawSocials, // Alias for legacy components
		associations,

		dob: member.dob,
		gender: member.gender,
		nationality,
		status: member.status,
		memberCode: member.memberCode || member.member_code || undefined,
		languages,

		// Now properly normalized with camelCase
		educations,
		experiences,
		// Legacy fields for compatibility
		education:
			educations.map((edu: any) => ({
				degree: edu.degree?.[DEFAULT_LANGUAGE_CODE] || "",
				institution: edu.schoolName?.[DEFAULT_LANGUAGE_CODE] || "",
				year: edu.endYear?.toString() || "",
			})),
		experience:
			experiences.map((exp: any) => ({
				title: exp.title?.[DEFAULT_LANGUAGE_CODE] || "",
				company: exp.organization?.[DEFAULT_LANGUAGE_CODE] || "",
				period: `${exp.startYear || ""} - ${exp.endYear || "Present"}`,
				description: exp.description?.[DEFAULT_LANGUAGE_CODE] || "",
			})),
		projects: [],
		testimonials: [],
	};
}

export const listMembersService = async (
	params: { [key: string]: any } = {}
): Promise<{ data: Member[]; meta_data: any }> => {
	const cleanParams: Record<string, string> = {};
	for (const key in params) {
		if (params[key] != null && params[key] !== "" && params[key] !== "all") {
			cleanParams[key] = String(params[key]);
		}
	}
	const queryParams = new URLSearchParams(cleanParams).toString();

	const url = queryParams
		? `${STRUCTURE_ENDPOINT}?${queryParams}`
		: STRUCTURE_ENDPOINT;
	const response = await fetchAPI<{
		data: APIMemberResponse[];
		meta_data: any;
	}>(url, { skipAuth: true, next: { revalidate: 300, tags: ["structures"] } });

	const paginatedData = response.data as any;
	const normalizedMembers = Array.isArray(paginatedData)
		? paginatedData.map((d: any) => normalizeMemberData(d))
		: [];

	return {
		data: normalizedMembers,
		meta_data: ((response as any).meta_data as any) || {},
	};
};

export const getMemberByIdService = async (id: string): Promise<Member> => {
	const response = await fetchAPI<APIMemberResponse>(
		`${STRUCTURE_ENDPOINT}/${id}`,
		{
			skipAuth: true,
			next: { revalidate: 300, tags: ["structures", `member:${id}`] },
		}
	);

	// response = { status_code, data: { ...member } }
	// Handle potential double-nesting: response.data might itself be { data: ... }
	let memberData = (response as any).data || response;
	if (memberData && memberData.data && memberData.status_code) {
		memberData = memberData.data; // unwrap double-nested
	}

	return normalizeMemberData(memberData);
};

export const createMemberService = async (
	memberData: Partial<APIMemberResponse>
): Promise<Member> => {
	const response = await fetchAPI<APIMemberResponse>(STRUCTURE_ENDPOINT, {
		method: "POST",
		body: JSON.stringify(memberData),
	});
	return normalizeMemberData(response);
};

export const updateMemberService = async (
	id: string,
	memberData: Partial<APIMemberResponse>
): Promise<Member> => {
	const response = await fetchAPI<APIMemberResponse>(
		`${STRUCTURE_ENDPOINT}/${id}`,
		{
			method: "PATCH",
			body: JSON.stringify(memberData),
		}
	);
	return normalizeMemberData(response);
};

export const deleteMemberService = async (id: string): Promise<void> => {
	await fetchAPI(`${STRUCTURE_ENDPOINT}/${id}`, {
		method: "DELETE",
	});
};

export const getAssociationService = async (): Promise<any> => {
	const response = await fetchAPI(`${STRUCTURE_ENDPOINT}/associations`, {
		skipAuth: true,
		next: { revalidate: 300, tags: ["structures", "associations"] },
	});
	return response;
};
