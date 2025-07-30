"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Person } from "@/lib/types/structure";

// Reusable Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// New Organized Components
import { ProfileCard } from "@/components/structure/detail/profile-card";
import { DetailSection } from "@/components/structure/detail/detail-section";

// Icons
import {
	ArrowLeft,
	Star,
	Award,
	BookOpen,
	Globe,
	Users,
	Heart,
} from "lucide-react";
import { getPersonById } from "@/lib/data/structure";

export default function PersonDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const [person, setPerson] = useState<Person | null>(null);

	useEffect(() => {
		// Fetch data from the single source of truth
		const foundPerson = getPersonById(params.id);
		if (foundPerson) {
			setPerson(foundPerson);
		} else {
			notFound();
		}
	}, [params.id]);

	if (!person) {
		return (
			<div className="flex h-screen items-center justify-center">
				Loading...
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<section className="relative py-16 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
				<div className="container">
					<div className="mb-6">
						<Button
							variant="ghost"
							asChild
							className="text-gray-600 hover:text-khmer-gold"
						>
							<Link href="/structure">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Back to Organization
							</Link>
						</Button>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						<div className="lg:col-span-1">
							<ProfileCard person={person} />
						</div>
						<div className="lg:col-span-2 space-y-8">
							<DetailSection title="Skills & Expertise" icon={Star}>
								<div className="flex flex-wrap gap-3">
									{person.skills.map((skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									))}
								</div>
							</DetailSection>

							<DetailSection
								title="Professional Experience"
								icon={Award}
								delay={0.1}
							>
								<div className="space-y-6">
									{person.experience.map((exp, index) => (
										<div key={index}>
											{index > 0 && <Separator className="mb-6" />}
											<div className="flex flex-col sm:flex-row items-start justify-between gap-2">
												<div>
													<h4 className="font-semibold text-lg">{exp.title}</h4>
													<p className="text-khmer-gold font-medium">
														{exp.company}
													</p>
												</div>
												<Badge variant="outline" className="flex-shrink-0">
													{exp.period}
												</Badge>
											</div>
											<p className="text-gray-600 mt-2">{exp.description}</p>
										</div>
									))}
								</div>
							</DetailSection>

							<DetailSection title="Education" icon={BookOpen} delay={0.2}>
								{person.education.map((edu, index) => (
									<div key={index} className="mb-4 last:mb-0">
										<h4 className="font-semibold">{edu.degree}</h4>
										<p className="text-sm text-khmer-gold">
											{edu.institution} - {edu.year}
										</p>
									</div>
								))}
							</DetailSection>

							{person.projects.length > 0 && (
								<DetailSection
									title="Projects Involved"
									icon={Users}
									delay={0.3}
								>
									<div className="flex flex-wrap gap-2">
										{person.projects.map((project) => (
											<Badge key={project} variant="outline">
												{project}
											</Badge>
										))}
									</div>
								</DetailSection>
							)}

							{person.testimonials.length > 0 && (
								<DetailSection title="What Others Say" icon={Heart} delay={0.4}>
									<div className="space-y-6">
										{person.testimonials.map((t, i) => (
											<div
												key={i}
												className="p-4 bg-gray-50 rounded-lg border italic"
											>
												"{t.text}"
												<p className="not-italic text-right font-medium text-sm mt-2">
													- {t.author}, {t.role}
												</p>
											</div>
										))}
									</div>
								</DetailSection>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
