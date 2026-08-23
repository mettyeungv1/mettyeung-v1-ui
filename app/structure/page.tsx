import React, { Suspense } from "react";
import {
	getAssociationService,
	listMembersService,
} from "@/service/structure/structure-service";
import { StructurePageClient } from "@/components/structure/structure-page-client";

import { toMediaUrl } from "@/lib/utils/image";

import type { Member } from "@/lib/types/structure";
import StructureLoading from "./loading";

async function StructureContent() {
	const [membersRes, associationsRes] = await Promise.all([
		listMembersService(),
		getAssociationService(),
	]);

	const rawMembers = Array.isArray(membersRes.data) ? membersRes.data : [];
	const initialMembers = rawMembers.map((member: Member) => ({
		...member,
		image: toMediaUrl(member.image)
	}));

	const rawAssociations = associationsRes?.data ? associationsRes.data : [];
	const allAssociations = rawAssociations.map((assoc: any) => ({
		...assoc,
		image_url: toMediaUrl(assoc.image_url),
		associationMembers: Array.isArray(assoc.associationMembers)
			? assoc.associationMembers.map((am: any) => ({
				...am,
				member: {
					...am.member,
					image: toMediaUrl(am.member?.image),
				},
			}))
			: [],
	}));

	return (
		<StructurePageClient
			initialMembers={initialMembers}
			initialAssociations={allAssociations}
		/>
	);
}

export default function StructurePage() {
	return (
		<Suspense fallback={<StructureLoading />}>
			<StructureContent />
		</Suspense>
	);
}
