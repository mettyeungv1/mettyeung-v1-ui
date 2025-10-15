import { fetchAPI } from "@/lib/api";
import { STRUCTURE_ENDPOINT } from "@/lib/static";
import type { Member, APIMemberResponse } from "@/lib/types/structure";
import { DEFAULT_LANGUAGE_CODE } from "@/lib/types/languages";

/**
 * Normalizes a raw member from the API into a clean, consistent Member type for the frontend.
 */
function normalizeMemberData(member: any): Member {
	const name_en = member.name || "Unknown Member";
	const title_en = member.title?.[DEFAULT_LANGUAGE_CODE] || "Member";
	const position_en = member.title?.[DEFAULT_LANGUAGE_CODE] || "Member";
	const location_en = member.location?.[DEFAULT_LANGUAGE_CODE] || "";
	const joinDate = member.joinYear
		? member.joinYear.toString()
		: new Date().getFullYear().toString();

	return {
		id: member.id,
		name: member.name,
		name_en,
		title_en,
		position_en,
		image: member.avatarUrl || "/placeholder-avatar.png",
		email: member.email || "",
		phone: member.phoneNumber || "",
		phoneNumber: member.phoneNumber || "",
		location: location_en,
		location_en,
		joinDate,
		joinYear: member.joinYear,
		bio: member.title?.[DEFAULT_LANGUAGE_CODE] || "",
		department: "", // Will be set from department context
		skills: member.skills?.map((s: any) => s.skillId) || [],
		socialLinks: [],
		// Additional fields from API
		educations: member.educations || [],
		experiences: member.experiences || [],
		associationIds: member.associationIds || [],
		// Legacy fields for compatibility
		education:
			member.educations?.map((edu: any) => ({
				degree: edu.degree?.[DEFAULT_LANGUAGE_CODE] || "",
				institution: edu.schoolName?.[DEFAULT_LANGUAGE_CODE] || "",
				year: edu.endYear?.toString() || "",
			})) || [],
		experience:
			member.experiences?.map((exp: any) => ({
				title: exp.title?.[DEFAULT_LANGUAGE_CODE] || "",
				company: exp.organization?.[DEFAULT_LANGUAGE_CODE] || "",
				period: `${exp.startYear || ""} - ${exp.endYear || "Present"}`,
				description: exp.description?.[DEFAULT_LANGUAGE_CODE] || "",
			})) || [],
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
	}>(url);

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
		`${STRUCTURE_ENDPOINT}/${id}`
	);
	return normalizeMemberData(response);
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
	const response = await fetchAPI(`${STRUCTURE_ENDPOINT}/associations`);
	return response;
};
