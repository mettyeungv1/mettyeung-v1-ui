import React from "react";
import {
	getAssociationService,
	listMembersService,
} from "@/service/structure/structure-service";
import { StructurePageClient } from "@/components/structure/structure-page-client";

import { normalizeUrl } from "@/lib/utils/image";

import type { Member } from "@/lib/types/structure";



export default async function StructurePage() {
	const [membersRes, associationsRes] = await Promise.all([
		listMembersService(),
		getAssociationService(),
	]);

	const rawMembers = Array.isArray(membersRes.data) ? membersRes.data : [];
	const initialMembers = rawMembers.map((member: Member) => ({
		...member,
		image: normalizeUrl(member.image)
	}));

	const allAssociations = associationsRes?.data ? associationsRes.data : [];

	return (
		<StructurePageClient
			initialMembers={initialMembers}
			initialAssociations={allAssociations}
		/>
	);
}
