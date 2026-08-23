import React from "react";
import { notFound } from "next/navigation";
import { getMemberByIdService } from "@/service/structure/structure-service";
import { PersonDetailClient } from "@/components/structure/detail/person-detail-client";
import { toMediaUrl } from "@/lib/utils/image";

interface PersonDetailPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function PersonDetailPage({ params }: PersonDetailPageProps) {
	const { id } = await params;

	if (!id) return notFound();

	try {
		const person = await getMemberByIdService(id);
		if (!person) return notFound();

		// Normalize image URL server-side so next/image can reach it inside Docker
		const normalizedPerson = {
			...person,
			image: toMediaUrl(person.image),
		};

		return <PersonDetailClient person={normalizedPerson} />;
	} catch (error) {
		console.error("Failed to fetch member:", error);
		return notFound();
	}
}
