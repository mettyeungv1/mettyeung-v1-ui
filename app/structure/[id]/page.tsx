import React from "react";
import { notFound } from "next/navigation";
import { getMemberByIdService } from "@/service/structure/structure-service";
import { PersonDetailClient } from "@/components/structure/detail/person-detail-client";

interface PersonDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export const dynamic = "force-dynamic";

export default async function PersonDetailPage({ params }: PersonDetailPageProps) {
	const { id } = await params;

	if (!id) return notFound();

	try {
		const person = await getMemberByIdService(id);
		if (!person) return notFound();

		return <PersonDetailClient person={person} />;
	} catch (error) {
		console.error("Failed to fetch member:", error);
		return notFound();
	}
}
